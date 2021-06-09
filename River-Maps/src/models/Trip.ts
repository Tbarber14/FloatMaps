export class Trip {
    _id: number;
    email: string;
    title: string;
    description: string;
    image: string;
    publishDate: Date;
    allMarkers: [number, number][];
  
    constructor(id: number, title: string, description = '', publishDate = new Date(), image = '', email = '', allMarkers = []) {
      this._id = id
      this.title = title
      this.description = description
      this.image = image
      this.publishDate = publishDate
      this.email = email
      this.allMarkers = allMarkers
    }
  }