import { ResourceController } from "@controllers/resource";
import * as TS from "@typescript/utils/parser";
import { Category, ParsedCategory } from "@typescript/models/business/category";
import { Collection, ParsedCollection } from "@typescript/models/business/collection";
import { ParsedProduct, Product } from "@typescript/models/business/product";
import { Coupon, ParsedCoupon } from "@typescript/models/business/coupon";

export class SchemaParser {
  private schemaData: TS.SchemaParser;

  constructor(schemaData: TS.SchemaParser) {
    this.schemaData = schemaData;
  }

  parseProduct(dataToParse: Product): ParsedProduct {
    const resourceController = new ResourceController();
    const parsed: ParsedProduct = {};

    if (dataToParse._id) parsed._id = dataToParse._id;
    if (dataToParse.status) parsed.status = dataToParse.status;
    if (dataToParse.business_id) parsed.business_id = dataToParse.business_id;
    if (dataToParse.reference) parsed.reference = dataToParse.reference;
    if (dataToParse.path) parsed.path = dataToParse.path;
    if (dataToParse.names)
      parsed.name =
        dataToParse.names[this.schemaData.language_code] ?
          dataToParse.names[this.schemaData.language_code]
        : dataToParse.names["Default"];
    if (dataToParse.descriptions)
      parsed.description =
        dataToParse.descriptions[this.schemaData.language_code] ?
          dataToParse.descriptions[this.schemaData.language_code]
        : dataToParse.descriptions["Default"];
    if (dataToParse.resources) {
      parsed.resources = [];
      dataToParse.resources.forEach(resource =>
        parsed.resources.push(resourceController.getResourceUrlByPublicId(resource.path))
      );
    }
    if (dataToParse.prices)
      parsed.price =
        dataToParse.prices[this.schemaData.currency_code] ?
          dataToParse.prices[this.schemaData.currency_code]
        : dataToParse.prices["Default"];
    if (dataToParse.creation_date) parsed.creation_date = dataToParse.creation_date;
    if (dataToParse.update_date) parsed.update_date = dataToParse.update_date;

    return parsed;
  }

  parseCategory(dataToParse: Category): ParsedCategory {
    const parsed: ParsedCategory = {};

    if (dataToParse._id) parsed._id = dataToParse._id;
    if (dataToParse.business_id) parsed.business_id = dataToParse.business_id;
    if (dataToParse.category_id) parsed.category_id = dataToParse.category_id;
    if (dataToParse.products_count || dataToParse.products_count === 0)
      parsed.products_count = dataToParse.products_count;
    if (dataToParse.names)
      parsed.name =
        dataToParse.names[this.schemaData.language_code] ?
          dataToParse.names[this.schemaData.language_code]
        : dataToParse.names["Default"];
    if (dataToParse.descriptions)
      parsed.description =
        dataToParse.descriptions[this.schemaData.language_code] ?
          dataToParse.descriptions[this.schemaData.language_code]
        : dataToParse.descriptions["Default"];
    if (dataToParse.taxes)
      parsed.taxes =
        dataToParse.taxes[this.schemaData.language_code] ?
          dataToParse.taxes[this.schemaData.language_code]
        : dataToParse.taxes["Default"];
    if (dataToParse.creation_date) parsed.creation_date = dataToParse.creation_date;
    if (dataToParse.update_date) parsed.update_date = dataToParse.update_date;

    return parsed;
  }

  parseCollection(dataToParse: Collection): ParsedCollection {
    const resourceController = new ResourceController();
    const parsed: ParsedCollection = {};

    if (dataToParse._id) parsed._id = dataToParse._id;
    if (dataToParse.status) parsed.status = dataToParse.status;
    if (dataToParse.business_id) parsed.business_id = dataToParse.business_id;
    if (dataToParse.products_count || dataToParse.products_count === 0)
      parsed.products_count = dataToParse.products_count;
    if (dataToParse.path) parsed.path = dataToParse.path;
    if (dataToParse.names)
      parsed.name =
        dataToParse.names[this.schemaData.language_code] ?
          dataToParse.names[this.schemaData.language_code]
        : dataToParse.names["Default"];
    if (dataToParse.descriptions)
      parsed.description =
        dataToParse.descriptions[this.schemaData.language_code] ?
          dataToParse.descriptions[this.schemaData.language_code]
        : dataToParse.descriptions["Default"];
    if (dataToParse.resources) {
      parsed.resources = [];
      dataToParse.resources.forEach(resource =>
        parsed.resources.push(resourceController.getResourceUrlByPublicId(resource.path))
      );
    }
    if (dataToParse.creation_date) parsed.creation_date = dataToParse.creation_date;
    if (dataToParse.update_date) parsed.update_date = dataToParse.update_date;

    return parsed;
  }

  parseCoupon(dataToParse: Coupon): ParsedCoupon {
    const parsed: ParsedCoupon = {};

    if (dataToParse._id) parsed._id = dataToParse._id;
    if (dataToParse.business_id) parsed.business_id = dataToParse.business_id;
    if (dataToParse.status) parsed.status = dataToParse.status;
    if (dataToParse.names)
      parsed.name =
        dataToParse.names[this.schemaData.language_code] ?
          dataToParse.names[this.schemaData.language_code]
        : dataToParse.names["Default"];
    if (dataToParse.codes)
      parsed.code =
        dataToParse.codes[this.schemaData.language_code] ?
          dataToParse.codes[this.schemaData.language_code]
        : dataToParse.codes["Default"];
    if (dataToParse.discount_type) parsed.discount_type = dataToParse.discount_type;
    if (dataToParse.discount_value) parsed.discount_value = dataToParse.discount_value;
    if (dataToParse.uses || dataToParse.uses === 0) parsed.uses = dataToParse.uses;
    if (dataToParse.uses_limit || dataToParse.uses_limit === 0) parsed.uses_limit = dataToParse.uses_limit;
    if (dataToParse.uses_limit_per_customer || dataToParse.uses_limit_per_customer === 0)
      parsed.uses_limit_per_customer = dataToParse.uses_limit_per_customer;
    if (dataToParse.expiration_date) parsed.expiration_date = dataToParse.expiration_date;
    if (dataToParse.creation_date) parsed.creation_date = dataToParse.creation_date;
    if (dataToParse.update_date) parsed.update_date = dataToParse.update_date;

    return parsed;
  }
}
