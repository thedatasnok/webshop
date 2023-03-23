package no.ntnu.webshop.contracts.item;

import java.util.List;
import java.util.Map;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@GenerateTypeScript
public record CreateItemRequest(
  @NotBlank String name,
  @NotNull String description,
  @PositiveOrZero Double priceGuidance,
  @Schema(
    description = "The ID of the family the item should belong to, or null if it should not belong to a family."
  ) Long familyId,
  @Schema(description = "A list of category IDs that this item belongs to.") List<Integer> categories,
  @Schema(description = "A map of attributes for that item, typically specifications.", example = """
    {
      "color": "red",
      "size": "large"
    }
    """) Map<String, String> attributes
) {}
