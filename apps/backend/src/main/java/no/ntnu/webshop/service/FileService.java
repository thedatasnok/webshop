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

/**
 * Service for uploading files to S3.
 */
@Slf4j
@Service
public class FileService {
  private AmazonS3 client;
  private String bucketName;

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
    var metadata = new ObjectMetadata();
    metadata.setContentType(file.getContentType());
    var key = String.join("/", "images", category.getIdentifier(), file.getOriginalFilename());

    // only proceed to upload if image does not already exist
    // could probably just put it anyway, but this prevents replacing existing images
    // TODO: catch exceptions for remote calls
    if (!this.client.doesObjectExist(this.bucketName, key)) {
      this.client.putObject(this.bucketName, key, file.getInputStream(), metadata);
      log.debug("Successfully uploaded image to S3 bucket");
    }

    return this.client.getUrl(this.bucketName, key).toString();
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
