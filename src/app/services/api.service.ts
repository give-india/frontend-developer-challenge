import { Injectable } from "@angular/core";
import { Constants } from "../utilities/constants";
import axios from "axios";
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { IVideoLink } from '../interfaces/IVideoLink';
@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private translate: TranslateService) {
    if (!localStorage.getItem(Constants.LinksStorageKey)) {
      localStorage.setItem(Constants.LinksStorageKey, "[]");
    }
  }
  public addLink = (newLink: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const linkURL = new URLSearchParams((new URL(newLink)).search);
      const videoId = linkURL.get("v");
      if (this.checkIfLinkAlreadyExists(videoId)) {
        reject(this.translate.instant("Errors.LinkAlreadyExists"));
      } else {
        this.checkIfLinkIsValid(videoId).then((response) => {
          if (response.responseStatus) {
            this.updateLinks(response.details[0]);
            resolve(this.translate.instant("VideoAdded"));
          } else {
            reject(this.translate.instant("Errors.VideoNotFound"));
          }
        });
      }
    });
  }

  private checkIfLinkAlreadyExists = (
    videoId: string
  ): boolean => {
    const links: IVideoLink[] = JSON.parse(
      localStorage.getItem(Constants.LinksStorageKey)
    );
    return Boolean(
      links.filter(link => {
        return link.id === videoId;
      }).length
    );
  }

  private updateLinks = (newLinkData: any): void => {
    let links: IVideoLink[] = JSON.parse(localStorage.getItem(Constants.LinksStorageKey));
    links.push({
      id: newLinkData.id,
      title: newLinkData.snippet.title,
      thumbnail: newLinkData.snippet.thumbnails.default.url
    });
    localStorage.setItem(Constants.LinksStorageKey, JSON.stringify(links));
  }

  private checkIfLinkIsValid = (videoId: string): Promise<{responseStatus: boolean, details?: any}> => {
    return new Promise((resolve) => {
      const youtubeLink = Constants.YoutubeEmbedAPIUrl + videoId + "&key=" + environment.apiKey;
      axios.get(youtubeLink).then((data) => {
        if (data.data.items.length > 0) {
          resolve({
            responseStatus: true,
            details: data.data.items
          });
        } else {
          resolve({ responseStatus: false });
        }
      }, () => {
          resolve({ responseStatus: false });
      });
    });
  }


}
