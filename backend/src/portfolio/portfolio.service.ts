import { Injectable } from '@nestjs/common';
import { portfolioData } from './portfolio.data';

@Injectable()
export class PortfolioService {
  getAll() {
    return portfolioData;
  }
}
