package no.ntnu.webshop.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;

import lombok.extern.slf4j.Slf4j;
import no.ntnu.webshop.error.model.FileUploadDisabledException;
import no.ntnu.webshop.error.model.FileUploadException;

/**
 * Service for uploading files to S3.
 */
@Slf4j
@Service
public class FileService {
  private AmazonS3 client;
  private String bucketName;
  private boolean isDisabled;

  private static final String DISABLED_VALUE = "disabled";

  public FileService(
      @Value("${no.ntnu.webshop.s3.access-key}") String accessKey,
      @Value("${no.ntnu.webshop.s3.secret-access-key}") String secretAccessKey,
      @Value("${no.ntnu.webshop.s3.region-name}") String regionName,
      @Value("${no.ntnu.webshop.s3.bucket-name}") String bucketName
  ) {
    var credentials = new BasicAWSCredentials(
      accessKey,
      secretAccessKey
    );

    // if any of the values are set to disabled we disable file upload due to configuration missing
    this.isDisabled = accessKey.equals(DISABLED_VALUE) || secretAccessKey.equals(DISABLED_VALUE)
        || regionName.equals(DISABLED_VALUE) || bucketName.equals(DISABLED_VALUE);

    log.info(
      "Disabling S3 image file uploads due to one of the configured values being set to 'disabled',"
          + "the environment variables need to be reviewed and updated for it to work"
    );

    this.client = AmazonS3ClientBuilder.standard()
      .withCredentials(new AWSStaticCredentialsProvider(credentials))
      .withRegion(regionName)
      .build();

    this.bucketName = bucketName;
  }

  /**
   * Uploads a file to the configured S3 bucket.
   * 
   * @param file     the file to upload
   * @param fileName the name of the file
   * 
   * @return the URL of the uploaded file
   */
  public String uploadFile(
      MultipartFile file,
      FileCategory category
  ) throws IOException {
    if (this.isDisabled)
      throw new FileUploadDisabledException("File upload is not configured, cannot upload file");

    var metadata = new ObjectMetadata();
    metadata.setContentType(file.getContentType());
    var key = String.join("/", "images", category.getIdentifier(), file.getOriginalFilename());

    try {
      // only uploads image if it does not already exist instead of overwriting
      if (!this.client.doesObjectExist(this.bucketName, key)) {
        this.client.putObject(this.bucketName, key, file.getInputStream(), metadata);
        log.debug("Successfully uploaded image to S3 bucket");
      }

      return this.client.getUrl(this.bucketName, key).toString();
    } catch (Exception e) {
      log.error("Failed to upload image to configured bucket: {}", e.getMessage());
      log.debug("Image upload failure stacktrace:", e);
      throw new FileUploadException("Something went wrong uploading file to configured bucket");
    }
  }

  /**
   * Enum for file categories, used to differentiate the types and thus place them in separate
   * locations in the configured S3 bucket.
   */
  public enum FileCategory {
    CATEGORY("categories"),
    PRODUCT("products");

    private String identifier;

    private FileCategory(
        String identifier
    ) {
      this.identifier = identifier;
    }

    public String getIdentifier() {
      return identifier;
    }
  }

}
