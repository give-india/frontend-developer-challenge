import { Component, ViewChild } from '@angular/core';
import { GoogleApiService } from 'ng-gapi';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myRadioApp';
  @ViewChild('videoplayer') videoPlayer ;

  constructor(private gapiService: GoogleApiService, private sanitizer: DomSanitizer){ 
      this.extractAllVideos();
      this.extractAllVideoIds();
      this.currentVideoid = this.allVideoIds[0];
      this.videoUrl =   this.sanitizer.bypassSecurityTrustResourceUrl(this.host + this.allVideoIds[0] + this.params)
  }

  host:String =  "https://www.youtube.com/embed/";
  params: String = "?enablejsapi=1&origin=http://localhost:4200";
  videoUrl: SafeResourceUrl;
  allVideos: any = [];
  allVideoIds: string[] = [];
  allThumbNails:any = [];
  currentVideoid = '';

  extractAllVideoIds() {
    this.mockData.items.map(e => {
      this.allVideoIds.push(e.id.videoId);
    })
    console.log(this.allVideoIds)
  }
 
  extractAllVideos() {
    this.mockData.items.map(e => {
      let obj:any = {};
      obj.thumbnail = e.snippet.thumbnails.default.url;
      obj.title =  e.snippet.title;
      obj.id = e.id.videoId;
      this.allVideos.push(obj);
    })
  }

  playSelectedVideo(video) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.host + video.id + this.params)
      this.currentVideoid = video.id
  }

  previous(url) {
    let index = this.allVideoIds.indexOf(this.currentVideoid);
    let previousIndex = index - 1;
    this.currentVideoid = this.allVideoIds[previousIndex]
    console.log(this.currentVideoid, previousIndex)
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.host + this.allVideoIds[previousIndex] + this.params)
  }

  next(url) {
    let index = this.allVideoIds.indexOf(this.currentVideoid);
    let nextIndex = index + 1;
    this.currentVideoid = this.allVideoIds[nextIndex]
    console.log(this.currentVideoid, nextIndex)
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.host + this.allVideoIds[nextIndex] + this.params)
  }

  mockData = {
    "kind": "youtube#searchListResponse",
    "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/fFNlnNhQB2E6ySFdngw1_eNM_Y4\"",
    "nextPageToken": "CBkQAA",
    "regionCode": "IN",
    "pageInfo": {
     "totalResults": 1000000,
     "resultsPerPage": 25
    },
    "items": [
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/UCi2n5gc6GIR9Zlm_nKed1GDaYo\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "Pt7s-HBkhGM"
      },
      "snippet": {
       "publishedAt": "2019-05-31T14:16:08.000Z",
       "channelId": "UCzcQOTuXYGuCvTekySb_CeQ",
       "title": "Bali Surf Journal - May 2019",
       "description": "April's good form spilled over into May with some glassy conditions and back to back swells at the start of the month. We didn't get anything as big as what we ...",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/Pt7s-HBkhGM/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/Pt7s-HBkhGM/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/Pt7s-HBkhGM/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "Surfers of Bali",
       "liveBroadcastContent": "none"
      }
     },
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/Amykv1hEk5vzuqlcAS8z2BEptrU\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "CWYDxh7QD34"
      },
      "snippet": {
       "publishedAt": "2014-09-02T16:52:33.000Z",
       "channelId": "UCblfuW_4rakIf2h6aqANefA",
       "title": "Best surfing action from Red Bull Cape Fear 2014",
       "description": "Click for the FULL EVENT: http://www.redbullcapefear.com/ The southern tip of Sydney Australia is home to one of the most treacherous waves on the planet: ...",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/CWYDxh7QD34/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/CWYDxh7QD34/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/CWYDxh7QD34/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "Red Bull",
       "liveBroadcastContent": "none"
      }
     },
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/OOD6SlB-NumCjkurCLUxN68r25E\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "nkhpGC10OVw"
      },
      "snippet": {
       "publishedAt": "2017-04-09T17:18:44.000Z",
       "channelId": "UCHeaHzQFLElUw__yG3SSzMg",
       "title": "World&#39;s best surfing 2017",
       "description": "World's best surfing 2017 — Enjoy the video. Rate, Comment, Share... Thanx Subscribe for new compilations: http://goo.gl/X017T If your Video is in this ...",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/nkhpGC10OVw/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/nkhpGC10OVw/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/nkhpGC10OVw/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "Monthly Winners",
       "liveBroadcastContent": "none"
      }
     },
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/S9cuXZkIvXoU_nwLKL9D3qGjIj4\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "26KzUnEbTUs"
      },
      "snippet": {
       "publishedAt": "2013-05-17T22:23:40.000Z",
       "channelId": "UCblfuW_4rakIf2h6aqANefA",
       "title": "Surfing the Heaviest Wave in the World - Teahupoo",
       "description": "Get barreled http://win.gs/1alYVe2 May 13th, 2013 will go down as a memorable day in the Tahitian history books. Watch as Tahitian demi-god Raimana Van ...",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/26KzUnEbTUs/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/26KzUnEbTUs/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/26KzUnEbTUs/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "Red Bull",
       "liveBroadcastContent": "none"
      }
     },
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/r_CR3LA6MI4eYmLwyqAnQuOJaPU\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "-X5Co77TuXw"
      },
      "snippet": {
       "publishedAt": "2019-05-23T19:30:48.000Z",
       "channelId": "UCo_q6aOlvPH7M-j_XGWVgXg",
       "title": "SURFING THE MEXICAN PIPELINE?",
       "description": "PIPELINES FLAT FOR THE SUMMER BUT WE FOUND THE NEXT BEST THING IN MEXICO, SURFING, BODYBOARDING, AND JUST STAYING REALLY ...",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/-X5Co77TuXw/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/-X5Co77TuXw/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/-X5Co77TuXw/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "Jamie O'Brien",
       "liveBroadcastContent": "none"
      }
     },
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/5qWXuXjZqN7RmGYJ72_Y2-B3TwE\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "5nCcE-jABSo"
      },
      "snippet": {
       "publishedAt": "2019-03-11T15:01:01.000Z",
       "channelId": "UCsooa4yRKGN_zEE8iknghZA",
       "title": "The physics of surfing - Nick Pizzo",
       "description": "Wondering how you can catch the perfect wave? Dive into the fascinating and complex physics of surfing. -- Whether or not you realize it, surfers are masters of ...",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/5nCcE-jABSo/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/5nCcE-jABSo/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/5nCcE-jABSo/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "TED-Ed",
       "liveBroadcastContent": "none"
      }
     },
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/j9grghmhodulrxd04LMAYUHGG8g\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "A_0tgAVjQPw"
      },
      "snippet": {
       "publishedAt": "2018-12-18T03:46:00.000Z",
       "channelId": "UCnJ0mt5Cgx4ER_LhTijG_4A",
       "title": "2018 Billabong Pipe Masters - Final Day Highlights | Triple Crown of Surfing | VANS",
       "description": "The waves were going off, Medina was going off. Watch the best moments of the final day of the Billabong Pipe Masters! Vans Triple Crown of Surfing is going ...",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/A_0tgAVjQPw/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/A_0tgAVjQPw/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/A_0tgAVjQPw/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "Vans",
       "liveBroadcastContent": "none"
      }
     },
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/f4B92xUeptcNLBwHd4cnYEjNyZE\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "eSwisMEtkBg"
      },
      "snippet": {
       "publishedAt": "2018-09-02T01:56:19.000Z",
       "channelId": "UCfn_qdZ1XMLRKIfMhexjooA",
       "title": "What Surfing Is Actually Like",
       "description": "The Gorpo I Use: https://amzn.to/2COZ1hQ The Mouth Mount I Use: https://amzn.to/2ClyqYM My Free Vlog Like A Pro Course: http://startavlog.com Favorite ...",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/eSwisMEtkBg/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/eSwisMEtkBg/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/eSwisMEtkBg/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "Atua Mo'e",
       "liveBroadcastContent": "none"
      }
     },
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/bVjV1CQjaJzN6eJ7H03KNM346uM\"",
      "id": {
       "kind": "youtube#channel",
       "channelId": "UCo_q6aOlvPH7M-j_XGWVgXg"
      },
      "snippet": {
       "publishedAt": "2012-12-02T06:07:19.000Z",
       "channelId": "UCo_q6aOlvPH7M-j_XGWVgXg",
       "title": "Jamie O'Brien",
       "description": "Living ~ The ~ Dream THIS ~ IS ~ JOB ~ VLOGS.",
       "thumbnails": {
        "default": {
         "url": "https://yt3.ggpht.com/-I4-8iE3YjY4/AAAAAAAAAAI/AAAAAAAAAAA/FQhqJmOCpI4/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"
        },
        "medium": {
         "url": "https://yt3.ggpht.com/-I4-8iE3YjY4/AAAAAAAAAAI/AAAAAAAAAAA/FQhqJmOCpI4/s240-c-k-no-mo-rj-c0xffffff/photo.jpg"
        },
        "high": {
         "url": "https://yt3.ggpht.com/-I4-8iE3YjY4/AAAAAAAAAAI/AAAAAAAAAAA/FQhqJmOCpI4/s800-c-k-no-mo-rj-c0xffffff/photo.jpg"
        }
       },
       "channelTitle": "Jamie O'Brien",
       "liveBroadcastContent": "none"
      }
     },
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/PIk_soSfwq140DDPeaMBqdvSmtg\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "Ftok14M5p8g"
      },
      "snippet": {
       "publishedAt": "2017-02-01T17:29:00.000Z",
       "channelId": "UCRln30B5KxyG7FpIloU7bHg",
       "title": "Biggest Waves Ever Surfed - Nazare",
       "description": "Please subscribe for more videos, thanks. Compilation of the Biggest waves ever surfed at Nazare Portugal. The waves at Praia do Norte, Nazaré, are famed for ...",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/Ftok14M5p8g/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/Ftok14M5p8g/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/Ftok14M5p8g/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "Joge Mysteries",
       "liveBroadcastContent": "none"
      }
     },
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/EvVv8mqr0gtQTBlEdQsDuW3OrDU\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "pn7SFWpXURk"
      },
      "snippet": {
       "publishedAt": "2017-03-07T17:00:57.000Z",
       "channelId": "UCqhnX4jA0A5paNd1v-zEysw",
       "title": "GoPro Surf: Inside the Legendary Barrels of Namibia",
       "description": "The term \"we scored waves\" in the surfing world gets thrown around quite a bit. Judging from this content of Koa and Alex Smith, Koa Rothman, Benji Brand and ...",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/pn7SFWpXURk/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/pn7SFWpXURk/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/pn7SFWpXURk/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "GoPro",
       "liveBroadcastContent": "none"
      }
     },
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/-G3XaviFb5CqBop2fAMRbQo2Dd4\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "Z32qL2MRkJM"
      },
      "snippet": {
       "publishedAt": "2014-02-03T16:27:06.000Z",
       "channelId": "UCsert8exifX1uUnqaoY3dqA",
       "title": "Surfing With Alana Blanchard &amp; Her Boyfriend Jack Freestone Ep. 305",
       "description": "Alana Surfer Girl (Season 3, episode 5): Pro surfer Alana Blanchard opens up about her relationship with Australian pro surfer Jack Freestone—how they met, ...",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/Z32qL2MRkJM/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/Z32qL2MRkJM/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/Z32qL2MRkJM/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "Network A",
       "liveBroadcastContent": "none"
      }
     },
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/mnaunq0o6-u42lOxOQk7QAMz7WE\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "anhRxIQutZ8"
      },
      "snippet": {
       "publishedAt": "2015-07-19T20:09:47.000Z",
       "channelId": "UCpwvZwUam-URkxB7g4USKpg",
       "title": "Jaw-dropping: Surfer fights off shark attack live on TV in S. African competition",
       "description": "Courtesy of World Surf League (WSL): www.worldsurfleague.com Professional Australian surfer Mick Fanning had a huge scare as his board was attacked by a ...",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/anhRxIQutZ8/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/anhRxIQutZ8/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/anhRxIQutZ8/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "RT",
       "liveBroadcastContent": "none"
      }
     },
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/OLnVnNyCmAIcZB06Ume1sfJe0iU\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "xg1hI0maw4o"
      },
      "snippet": {
       "publishedAt": "2015-06-24T00:35:24.000Z",
       "channelId": "UCG9zpGg_D31bPfeiaotC-Fg",
       "title": "Surf City Epic Big Board Ride  6/20/15",
       "description": "100% Drone Video Footage gives you the Best View of the Guinness Record event.",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/xg1hI0maw4o/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/xg1hI0maw4o/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/xg1hI0maw4o/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "AnHbSurfnut",
       "liveBroadcastContent": "none"
      }
     },
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/AD7sXFmNIsziect608vZjRHozU8\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "wxBtwCZtDAg"
      },
      "snippet": {
       "publishedAt": "2018-11-21T01:00:11.000Z",
       "channelId": "UCZFhj_r-MjoPCFVUo3E1ZRg",
       "title": "13-Year-Old FEARLESS Surfing Prodigy",
       "description": "NEW No Days Off gear: https://whistle.video/NoDaysOffMerch 13-Year-Old Kai Williams was born to surf. Nobody works harder at their craft! COMMENT with ...",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/wxBtwCZtDAg/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/wxBtwCZtDAg/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/wxBtwCZtDAg/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "Whistle",
       "liveBroadcastContent": "none"
      }
     },
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/6a-Fq3KB73A_JNhIzBqe67O4vpo\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "Oi0vHp50cAk"
      },
      "snippet": {
       "publishedAt": "2019-05-23T16:00:05.000Z",
       "channelId": "UC--3c8RqSfAqYBdDjIG3UNA",
       "title": "Tyler Newton And Tahiti&#39;s Best Surfers Take On Perfect Teahupo&#39;o | Sessions",
       "description": "Subscribe to Red Bull Surfing on Youtube: https://win.gs/SubToRedBullSurfing When Hawaiian charger Tyler Newton checked the South Pacific swell charts and ...",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/Oi0vHp50cAk/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/Oi0vHp50cAk/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/Oi0vHp50cAk/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "Red Bull Surfing",
       "liveBroadcastContent": "none"
      }
     },
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/E8GZG_CZfJeaVF75eZYmJHnGe0c\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "rj7xMBxd5iY"
      },
      "snippet": {
       "publishedAt": "2017-11-12T11:09:52.000Z",
       "channelId": "UCiiFGfvlKvX3uzMovO3unaw",
       "title": "BIG WAVE SURFING COMPILATION 2017",
       "description": "BIG WAVE SURFING COMPILATION 2017 ** REVISED **AMAZING FOOTAGE ** WITH 60-100FT- HUGE SURF Please Subscribe if You Would like to see More ...",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/rj7xMBxd5iY/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/rj7xMBxd5iY/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/rj7xMBxd5iY/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "Absolutely Flawless",
       "liveBroadcastContent": "none"
      }
     },
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/vhd3Bg7W7ZCFHFxg8OfKjdMjFcQ\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "_XLekfSYVGU"
      },
      "snippet": {
       "publishedAt": "2018-08-24T15:00:08.000Z",
       "channelId": "UCYd0us2OtW4d4-1cfpT2ktw",
       "title": "SURFING WITH THE NORRIS NUTS *youngest sister Is amazing*",
       "description": "Sibling support is everything. Naz Norris surfs a scary rock break for the first time by herself surfing with the support of the Norris Nuts. LAST VIDEO here ...",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/_XLekfSYVGU/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/_XLekfSYVGU/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/_XLekfSYVGU/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "The Norris Nuts",
       "liveBroadcastContent": "none"
      }
     },
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/7SjObVtufHTm4dzGErAIMLn_VIM\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "tDOM-U7uStM"
      },
      "snippet": {
       "publishedAt": "2015-05-07T17:29:13.000Z",
       "channelId": "UC9fD1YzP97mOg-KjXSuCQ2g",
       "title": "Surfing Dogs",
       "description": "We were so stoked to be at the Unleashed by Petco Surfing Dog Competition that happened in Huntington beach. This was a fun hot summer day with dogs, kids ...",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/tDOM-U7uStM/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/tDOM-U7uStM/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/tDOM-U7uStM/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "Tower Life",
       "liveBroadcastContent": "none"
      }
     },
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/cw3q5oZrQ_fnccrzpNpHxZauhzw\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "MuexgcvV_XY"
      },
      "snippet": {
       "publishedAt": "2019-05-09T19:46:42.000Z",
       "channelId": "UCo_q6aOlvPH7M-j_XGWVgXg",
       "title": "SURFING WITH JOHN JOHN FLORENCE",
       "description": "PIPELINE IS FIRING AND JOHN JOHN CALLED ME FOR AN AIR CAMP. TWO SUPER SESSIONS IN ONE DAY WITH THE WORLD CHAMP. . BUY OUR ...",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/MuexgcvV_XY/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/MuexgcvV_XY/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/MuexgcvV_XY/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "Jamie O'Brien",
       "liveBroadcastContent": "none"
      }
     },
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/ojHhn1pyZJPpk69RHv-gYAkJcfw\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "5Vwb3kPwGn4"
      },
      "snippet": {
       "publishedAt": "2017-09-20T20:48:32.000Z",
       "channelId": "UCW8zgx5JhvFPmIZh7NI-jrA",
       "title": "Biggest Surfing Wipeouts #1",
       "description": "Would you like to be in their place? No or really not?",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/5Vwb3kPwGn4/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/5Vwb3kPwGn4/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/5Vwb3kPwGn4/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "SuRf, GaMe & Action",
       "liveBroadcastContent": "none"
      }
     },
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/7_1rWE1YDbZxwGlY5tl7UwjPFuY\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "FA40RI7x000"
      },
      "snippet": {
       "publishedAt": "2019-01-14T18:25:20.000Z",
       "channelId": "UCW8zgx5JhvFPmIZh7NI-jrA",
       "title": "Surfers caught inside massive waves - HOLD YOUR BREATH 2",
       "description": "When you see the mountain coming in the horizon, whats your first thought?",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/FA40RI7x000/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/FA40RI7x000/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/FA40RI7x000/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "SuRf, GaMe & Action",
       "liveBroadcastContent": "none"
      }
     },
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/WznjU0SpaKoMkx-E7Jf-iI4VIgs\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "xU3iCjnlqx8"
      },
      "snippet": {
       "publishedAt": "2019-01-16T00:05:33.000Z",
       "channelId": "UCKo-NbWOxnxBnU41b-AoKeA",
       "title": "The Best Surf Clips of 2018 | SURFER Magazine",
       "description": "Drawing from SURFER's “Clips of the Month” series, here's a (very arguable) list of the “Clips of the Year.” No matter how you slice it, 2018 was an incredible trip ...",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/xU3iCjnlqx8/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/xU3iCjnlqx8/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/xU3iCjnlqx8/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "SURFER",
       "liveBroadcastContent": "none"
      }
     },
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/KXAX5qQ7KVG1tMUHZcarahe1vK8\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "zMClH1apa20"
      },
      "snippet": {
       "publishedAt": "2017-11-10T21:24:18.000Z",
       "channelId": "UCbAlVnKhbGLK78GsSemQXxw",
       "title": "Top 5 INSANE SURFING WIPEOUTS",
       "description": "These guys are brave! Here's our list of the top five insane surfing wipeouts. Let us know in the comments below some of your top five ideas! Several segments ...",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/zMClH1apa20/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/zMClH1apa20/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/zMClH1apa20/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "Top Fives",
       "liveBroadcastContent": "none"
      }
     },
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/LxwozmDGcAwFLOqQqbZYbkpVfRk\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "aizVVLXK0Ms"
      },
      "snippet": {
       "publishedAt": "2016-10-01T20:06:48.000Z",
       "channelId": "UCBi2mrWuNuyYy4gbM6fU18Q",
       "title": "7-Year-Old Phenom &#39;Flying Squirrel&#39; Takes Surfing World by Storm",
       "description": "Meet quite possibly the best child surfer in the world, Quincy Symonds. SUBSCRIBE to ABC NEWS: https://www.youtube.com/ABCNews/ Watch More on ...",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/aizVVLXK0Ms/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/aizVVLXK0Ms/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/aizVVLXK0Ms/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "ABC News",
       "liveBroadcastContent": "none"
      }
     }
    ]
   }
   

}
