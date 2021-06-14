export class Trip {
    _id: string;
    email: string;
    title: string;
    description: string;
    image: string;
    publishDate: Date;
    distance: Number;
    allMarkers: [number, number][];
  
    constructor(_id: string = '', title: string, description = '', publishDate = new Date(), image = '', email = '', allMarkers = [], distance = 0) {
      this._id = _id
      this.title = title
      this.description = description
      this.image = image
      this.publishDate = publishDate
      this.email = email
      this.allMarkers = allMarkers
      this.distance = distance
    }
  }