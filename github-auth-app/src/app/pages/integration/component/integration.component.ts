import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GithubIntegrationService } from '../../../services/github-integration.service';
import { ActivatedRoute } from '@angular/router';
import { Integration } from 'src/app/models/integration.model';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntegrationComponent implements OnInit {
  connected: boolean = false;
  integrationData$ = new BehaviorSubject<Integration | null>(null);

  constructor(private _githubService: GithubIntegrationService,
    private _actRoute: ActivatedRoute,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const githubId = this._actRoute.snapshot.queryParams['id'];
    if (githubId) {
      this.fetchIntegration(githubId);
    }
  }

  connect() {
    this._githubService.connectGithub();
  }

  fetchIntegration(githubId: string) {
    this._githubService.getIntegrationByGitHubId(githubId).subscribe(
      (data) => {
        this.connected = true;
        this.integrationData$.next(new Integration(data))
        this.showMessage('Successfully integration done');

      },
      (error) => {
        console.error('Error fetching integration:', error);
        this.showMessage(error?.error?.message);
      }
    );
  }

  remove() {
    this._githubService.removeIntegration(this.integrationData$.value?.githubId).subscribe(() => {
      this.connected = false;
      this.integrationData$.next(null);
      this.showMessage('Integration removed')
    });
  };

  showMessage(msg: string) {
    this._snackBar.open(msg, 'Ok', {
      duration: 3000,
    });
  }
}
