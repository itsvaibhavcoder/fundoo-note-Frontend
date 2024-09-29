import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { HttpHeaders } from '@angular/common/http';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService]
    });

    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getApiCall', () => {
    it('should call GET API and return the response', () => {
      const mockResponse = { data: 'Test Data' };
      const endpoint = 'test-endpoint';

      service.getApiCall(endpoint).subscribe((response: any) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(service['baseUrl'] + endpoint);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('postApiCall', () => {
    it('should call POST API with the provided payload and return the response', () => {
      const mockResponse = { data: 'Test Data' };
      const endpoint = 'test-endpoint';
      const payload = { name: 'Test' };

      service.postApiCall(endpoint, payload, true).subscribe((response: any) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(service['baseUrl'] + endpoint);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(payload);
      req.flush(mockResponse);
    });
  });

  describe('deleteApiCall', () => {
    it('should call DELETE API and return the response', () => {
      const endpoint = 'test-endpoint';
      const mockResponse = { success: true };

      service.deleteApiCall(endpoint).subscribe((response: any) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(service['baseUrl'] + endpoint);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockResponse);
    });
  });

  describe('putApiCall', () => {
    it('should call PUT API with the provided payload and return the response', () => {
      const endpoint = 'test-endpoint';
      const payload = { name: 'Updated Test' };
      const mockResponse = { success: true };

      service.putApiCall(endpoint, payload).subscribe((response: any) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(service['baseUrl'] + endpoint);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(payload);
      req.flush(mockResponse);
    });
  });

  describe('getHeader', () => {
    it('should return HttpHeaders with the correct Authorization token', () => {
      const accessToken = 'mockToken';
      spyOn(localStorage, 'getItem').and.returnValue(accessToken);

      const headers = service.getHeader();
      expect(headers instanceof HttpHeaders).toBeTruthy();
      expect(headers.get('Authorization')).toBe(`bearer ${accessToken}`);
    });
  });
});
