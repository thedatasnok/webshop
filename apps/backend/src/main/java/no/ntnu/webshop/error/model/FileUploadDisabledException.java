package no.ntnu.webshop.error.model;

import org.springframework.http.HttpStatus;

public class FileUploadDisabledException extends StatusCodeException {

  public FileUploadDisabledException(
      String message
  ) {
    super(message, "FILE_UPLOAD_DISABLED", HttpStatus.BAD_REQUEST);
  }

}
