import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class GithubIntegrationService {
    baseUrl = environment.API_BASE_URL
  constructor(private http: HttpClient) { }

  connectGithub(): void {
    window.open(this.baseUrl +'/auth/github','_self')
  }

  getIntegrationByGitHubId(githubId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/integration/${githubId}`);
  }

  removeIntegration(githubId?: string): Observable<any> {
    return this.http.post(this.baseUrl + '/auth/integration/remove', { githubId });
  }
}
