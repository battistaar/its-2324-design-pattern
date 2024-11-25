import { DynamicModule, Module, Provider } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CompanyDataSource } from "./datasource/company.ds";
import { Company, CompanySchema } from "./entities/company.schema";

@Module({})
export class CompanyModule {
  static forRoot(providers: Provider[], global = true): DynamicModule {
    return {
      global,
      module: CompanyModule,
      imports: [MongooseModule.forFeature([{name: Company.name, schema: CompanySchema}])],
      providers: [
        ...providers
      ],
      exports: [CompanyDataSource]
    }
  }
}