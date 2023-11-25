import { ResourceController } from "@controllers/resource";
import * as TS from "@typescript/utils/parser";
import { Category, ParsedCategory } from "@typescript/models/business/category";
import { Collection, ParsedCollection } from "@typescript/models/business/collection";
import { ParsedProduct, Product } from "@typescript/models/business/product";

export class SchemaParser {
  private schemaData: TS.SchemaParser;

  constructor(schemaData: TS.SchemaParser) {
    this.schemaData = schemaData;
  }

  parseProduct(dataToParse: Product): ParsedProduct {
    const resourceController = new ResourceController();
    const parsedProduct: ParsedProduct = {};

    if (dataToParse._id) parsedProduct._id = dataToParse._id;
    if (dataToParse.status) parsedProduct.status = dataToParse.status;
    if (dataToParse.business_id) parsedProduct.business_id = dataToParse.business_id;
    if (dataToParse.path) parsedProduct.path = dataToParse.path;
    if (dataToParse.names)
      parsedProduct.name =
        dataToParse.names[this.schemaData.language_code] ?
          dataToParse.names[this.schemaData.language_code]
        : dataToParse.names["Default"];
    if (dataToParse.descriptions)
      parsedProduct.description =
        dataToParse.descriptions[this.schemaData.language_code] ?
          dataToParse.descriptions[this.schemaData.language_code]
        : dataToParse.descriptions["Default"];
    if (dataToParse.resources) {
      parsedProduct.resources = [];
      dataToParse.resources.forEach(resource =>
        parsedProduct.resources.push(resourceController.getResourceUrlByPublicId(resource.path))
      );
    }
    if (dataToParse.prices)
      parsedProduct.price =
        dataToParse.prices[this.schemaData.currency_code] ?
          dataToParse.prices[this.schemaData.currency_code]
        : dataToParse.prices["Default"];
    if (dataToParse.creation_date) parsedProduct.creation_date = dataToParse.creation_date;
    if (dataToParse.update_date) parsedProduct.update_date = dataToParse.update_date;

    return parsedProduct;
  }

  parseCategory(dataToParse: Category): ParsedCategory {
    const parsedCategory: ParsedCategory = {};

    if (dataToParse._id) parsedCategory._id = dataToParse._id;
    if (dataToParse.business_id) parsedCategory.business_id = dataToParse.business_id;
    if (dataToParse.category_id) parsedCategory.category_id = dataToParse.category_id;
    if (dataToParse.names)
      parsedCategory.name =
        dataToParse.names[this.schemaData.language_code] ?
          dataToParse.names[this.schemaData.language_code]
        : dataToParse.names["Default"];
    if (dataToParse.descriptions)
      parsedCategory.description =
        dataToParse.descriptions[this.schemaData.language_code] ?
          dataToParse.descriptions[this.schemaData.language_code]
        : dataToParse.descriptions["Default"];
    if (dataToParse.taxes)
      dataToParse.taxes[this.schemaData.language_code] ?
        dataToParse.taxes[this.schemaData.language_code]
      : dataToParse.taxes["Default"];
    if (dataToParse.creation_date) parsedCategory.creation_date = dataToParse.creation_date;
    if (dataToParse.update_date) parsedCategory.update_date = dataToParse.update_date;

    return parsedCategory;
  }

  parseCollection(dataToParse: Collection): ParsedCollection {
    const resourceController = new ResourceController();
    const parsedColelction: ParsedCollection = {};

    if (dataToParse._id) parsedColelction._id = dataToParse._id;
    if (dataToParse.status) parsedColelction.status = dataToParse.status;
    if (dataToParse.business_id) parsedColelction.business_id = dataToParse.business_id;
    if (dataToParse.path) parsedColelction.path = dataToParse.path;
    if (dataToParse.names)
      parsedColelction.name =
        dataToParse.names[this.schemaData.language_code] ?
          dataToParse.names[this.schemaData.language_code]
        : dataToParse.names["Default"];
    if (dataToParse.descriptions)
      parsedColelction.description =
        dataToParse.descriptions[this.schemaData.language_code] ?
          dataToParse.descriptions[this.schemaData.language_code]
        : dataToParse.descriptions["Default"];
    if (dataToParse.resource)
      parsedColelction.resource = resourceController.getResourceUrlByPublicId(dataToParse.resource.path);
    if (dataToParse.creation_date) parsedColelction.creation_date = dataToParse.creation_date;
    if (dataToParse.update_date) parsedColelction.update_date = dataToParse.update_date;

    return parsedColelction;
  }
}