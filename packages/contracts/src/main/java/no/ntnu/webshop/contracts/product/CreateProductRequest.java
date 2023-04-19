package no.ntnu.webshop.contracts.product;

import java.util.List;
import java.util.Map;
import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;
import no.ntnu.webshop.contracts.utility.annotation.Nullable;

@GenerateTypeScript
public record CreateProductRequest(
  @NotBlank String name,
  @Nullable String shortName,
  @NotNull String description,
  @Nullable String shortDescription,
  @NotNull @Size(min = 1) List<String> imageUrls,
  @NotNull @Min(0) Double price,
  @NotNull Boolean isDiscount,
  @Nullable Long familyId,
  @NotNull Set<Integer> categoryIds,
  @Schema(description = "The attributes of the product, keyed by their name.", example = """
    {
      "color": "red",
      "size": "large"
    }
    """) @Nullable Map<String, String> attributes,
  @Schema(description = "The amount of children products keyed by the item id.", example = """
    {
      "1": 1,
      "2": 2
    }
    """) @Nullable Map<Long, Integer> children
) {}
