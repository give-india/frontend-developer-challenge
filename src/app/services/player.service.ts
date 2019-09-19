import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IPlayerCommunication } from "../interfaces/IPlayerCommunication";

@Injectable({
  providedIn: "root"
})
export class PlayerService {
  private playlistSubject = new Subject<IPlayerCommunication>();
  constructor() { }
  sendUpdateToPlayer(params: IPlayerCommunication) {
    this.playlistSubject.next(params);
  }
  // clearMessage() {
  //   this.playlistSubject.next();
  // }

  updatePlayer(): Observable<IPlayerCommunication> {
    return this.playlistSubject.asObservable();
  }
}
