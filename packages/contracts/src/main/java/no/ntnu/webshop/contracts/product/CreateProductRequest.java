package no.ntnu.webshop.contracts.product;

import java.util.List;
import java.util.Map;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@GenerateTypeScript
public record CreateProductRequest(
  @NotBlank String name,
  @NotNull String description,
  @NotNull @Size(min = 1) List<String> imageUrls,
  @NotNull @Min(0) Double price,
  @NotNull Boolean isDiscount,
  @Schema(description = "The amount of items keyed by the item id.", example = """
    {
      "1": 1,
      "2": 2
    }
    """) @NotNull @Size(min = 1) Map<Long, Integer> items
) {}
