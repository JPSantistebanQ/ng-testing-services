import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../models/product.model';
import { environment } from '../../environments/environment';
import {
  generateManyProducts,
  generateOneProduct,
} from '../models/product.mock';

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

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Tests for getAllSimple', () => {
    it('should return products list', (done) => {
      const mockData: Product[] = generateManyProducts(2);
      service.getAll().subscribe((data) => {
        expect(data.length).toEqual(mockData.length);
        done();
      });

      // * http configuration
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });
  });

  describe('Test for getAll', () => {
    it('should return products list whit taxes', (done) => {
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, // 100 * .19 = 19
        },
        {
          ...generateOneProduct(),
          price: 200, // 200 * .19 = 38
        },
      ];
      service.getAll().subscribe((data) => {
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        done();
      });

      // * http configuration
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should return products list whit taxes', (done) => {
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, // 100 * .19 = 19
        },
        {
          ...generateOneProduct(),
          price: 200, // 200 * .19 = 38
        },
        {
          ...generateOneProduct(),
          price: 0, //0 * .19 = 0
        },
        {
          ...generateOneProduct(),
          price: -100, // = 0
        },
      ];
      service.getAll().subscribe((data) => {
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);
        done();
      });

      // * http configuration
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should send query params width limit 10 offset 3', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 3;
      //Act
      service.getAll(limit, offset).subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });
      //http config
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
    });
  });

  describe('test for create', () => {
    it('should return a new product', (doneFn) => {
      // Arrange
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'new Product',
        price: 100,
        images: ['img'],
        description: 'bla bla bla',
        categoryId: 12,
      };
      // Act
      service.create({ ...dto }).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });
      //http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');
    });
  });

  describe('Test for update product', () => {
    it('#update, should update a product', (doneFn) => {
      // Arrange
      const mockData = generateOneProduct();
      const productId = '1';
      const dto: UpdateProductDTO = {
        title: 'Product edited',
        price: 1000,
        images: ['img'],
        description: 'This is a product edited',
        categoryId: 12,
      };
      // Act
      service.update(productId, { ...dto }).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });
      // Http Config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(`${url}`);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('PUT');
    });
  });

  describe('Test for delete product', () => {
    it('#Delete, should delete a product', (doneFn) => {
      // Arrange
      const productId = '1';
      // Act
      service.delete(productId).subscribe((data) => {
        // Assert
        expect(data).toBe(true);
        doneFn();
      });
      // Http Config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(`${url}`);
      req.flush(true);
      expect(req.request.method).toEqual('DELETE');
    });
  });
});
