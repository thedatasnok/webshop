package no.ntnu.webshop.contracts.order;

import java.util.Date;

import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@GenerateTypeScript
public record OrderSummary(Date date, Long numberOfSales, Double sumOfSales) {}
