import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

describe('ProductService', () => {
  let service: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Tests for getAllSimple', () => {
    it('should return products list', (done) => {
      const mockData: Product[] = [
        {
          id: '1',
          title: 'Product 1',
          price: 100,
          description: 'Description 1',
          images: ['image1.jpg'],
          category: {
            id: 1,
            name: 'Category 1',
          },
        },
      ];
      service.getAll().subscribe((data) => {
        expect(data.length).toEqual(mockData.length);
        //expect(data).toEqual(mockData);
        done();
      });

      // * http configuration
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      httpController.verify();
    });
  });
});
