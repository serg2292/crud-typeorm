import { DotenvConfigOutput, DotenvParseOutput, config } from "dotenv";
import { IConfigService } from "./config.service.interface";

class ConfigService implements IConfigService {
  private config: DotenvParseOutput;
  constructor() {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      console.error("Не удалось прочитать файл .env или он отсутствует");
    } else {
      this.config = result.parsed as DotenvParseOutput;
    }
  }
  get(key: string) {
    return this.config[key] as string;
  }
}

export default new ConfigService();
