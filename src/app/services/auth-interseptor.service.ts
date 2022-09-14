import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export class AuthInterseptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const newResponse = req.clone({
      headers: req.headers.append('Auth', 'XYZ'),
    });
    return next.handle(newResponse).pipe(tap((event) => {}));
  }
}
