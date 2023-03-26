package no.ntnu.webshop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.item.CreateItemRequest;
import no.ntnu.webshop.error.model.ItemFamilyNotFoundException;
import no.ntnu.webshop.model.Item;
import no.ntnu.webshop.model.ItemFamily;
import no.ntnu.webshop.repository.ItemFamilyJpaRepository;
import no.ntnu.webshop.repository.ItemJpaRepository;
import no.ntnu.webshop.security.annotation.ShopWorkerAuthorization;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/items")
public class ItemController {
  private final ItemJpaRepository itemJpaRepository;
  private final ItemFamilyJpaRepository itemFamilyJpaRepository;

  @PostMapping
  @ShopWorkerAuthorization
  public ResponseEntity<Object> createItem(
      @Valid @RequestBody CreateItemRequest request
  ) {
    ItemFamily itemFamily = null;

    if (request.familyId() != null) {
      itemFamily = this.itemFamilyJpaRepository.findById(request.familyId())
        .orElseThrow(() -> new ItemFamilyNotFoundException("Could not find item family with id " + request.familyId()));
    }

    var item = new Item(
      request.name(),
      request.description(),
      request.priceGuidance(),
      // we allow the item family to not exist
      itemFamily,
      request.attributes()
    );

    this.itemJpaRepository.save(item);

    return ResponseEntity.ok().build();
  }

}
