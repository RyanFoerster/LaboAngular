import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {Observable} from "rxjs";
import {environments} from "../../../environments/environments";
import {ChangePassword} from "../models/ChangePassword";

@Injectable()
export class MemberService {

  constructor(private _httpClient: HttpClient) {

  }

  addMember(memberToAdd: User): Observable<User>{
      return this._httpClient.post<User>(`${environments.apiUrl}/Member`, memberToAdd)
  }

  changePassword(password: ChangePassword): Observable<ChangePassword>{
      return this._httpClient.patch<ChangePassword>(`${environments.apiUrl}/Member/password`, password)
  }
}
