// import { HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next): Observable<HttpEvent<any>> => {

//   const _BASE_URL = 'http://localhost:8080/api/v1/';
//   let apiRequest = req.clone({
//     url: _BASE_URL + req.url
//   });

//   // Call the next handler, passing the modified request
//   return next(apiRequest);
// };