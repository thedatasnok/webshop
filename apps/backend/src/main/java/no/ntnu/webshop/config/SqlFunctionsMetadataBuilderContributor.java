package no.ntnu.webshop.config;

import org.hibernate.boot.MetadataBuilder;
import org.hibernate.boot.spi.MetadataBuilderContributor;
import org.hibernate.dialect.function.StandardSQLFunction;
import org.hibernate.type.StandardBasicTypes;

public class SqlFunctionsMetadataBuilderContributor implements MetadataBuilderContributor {

  /**
   * Contributes to the {@link MetadataBuilder} by adding the SQL function "SIMILARITY" which is
   * provided by the "pg_trgm" extension in Postgres. This class file is referenced from the
   * application properties, resulting in it being applied.
   * 
   * This essentially allows us to use the SIMILARITY() function in JPQL queries.
   * 
   * @see no.ntnu.webshop.repository.ProductJpaRepository#findProducts An example of this function
   *      being used
   */
  @Override
  public void contribute(
      MetadataBuilder metadataBuilder
  ) {
    metadataBuilder.applySqlFunction(
      "SIMILARITY",
      new StandardSQLFunction(
        "SIMILARITY",
        StandardBasicTypes.TEXT
      )
    );
  }

}
