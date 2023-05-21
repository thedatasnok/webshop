package no.ntnu.webshop.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import no.ntnu.webshop.model.Order;

public interface OrderJpaRepository extends JpaRepository<Order, Long> {

  /**
   * Finds an order by its id and the customers id.
   * 
   * @param id         the id of the order to find
   * @param customerId the id of the customer that owns the order
   * 
   * @return an optional containing the order, if found
   */
  @Query("SELECT o FROM Order o WHERE o.id = :id AND o.customer.id = :customerId")
  Optional<Order> findByIdAndCustomer(
      @Param("id") Long id,
      @Param("customerId") UUID customerId
  );

}
