package no.ntnu.webshop.error.model;

import org.springframework.http.HttpStatus;

public class FileUploadException extends StatusCodeException {

  public FileUploadException(
      String message
  ) {
    super(message, "FILE_UPLOAD_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
  }

}
