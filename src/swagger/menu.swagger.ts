import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from "@nestjs/swagger";

class SwaggerMenu {
  protected app;
  protected menu;

  protected options: SwaggerCustomOptions = {
    swaggerOptions: {
      swaggerOptions: {
        persistAuthorization: true,
        crossOriginIsolated: false,
      },
    },
  };

  public setApp(app: INestApplication) {
    this.app = app;
    return this;
  }

  public setMenu(menu: Array<{ name: string; path: string; module: object }>) {
    this.menu = menu;
    return this;
  }

  public get(title: string, description: string) {
    if (!this.app) return new Error("not found swagger app");
    if (!this.menu) return new Error("not found swagger menh");
    const configSwagger = new DocumentBuilder()
      .setTitle(title)
      .setDescription(`${description} ${this.getMenuTemp()}`)
      .setVersion("1.0")
      .build();

    for (const item of this.menu) {
      if (item.module.length !== 0) {
        const documentSwagger = SwaggerModule.createDocument(this.app, configSwagger, {
          include: item.module,
        });
        SwaggerModule.setup(item.path, this.app, documentSwagger, this.options);
      }
    }
  }

  protected getMenuTemp() {
    const option = this.menu
      .map((v, i) => {
        return `<div><a href="${v.path}">${v.name}</a></div>`;
      })
      .reduce((prev: string, current: string) => prev + current, "");
    return `<div>${option}</div>`;
  }
}

export default new SwaggerMenu();
