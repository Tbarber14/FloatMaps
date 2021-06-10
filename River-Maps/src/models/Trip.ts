export class Trip {
    email: String;
    title: String;
    description: String;
    image: String;
    publishDate: Date;
    distance: Number;
    allMarkers: [number, number][];
  
    constructor(title: String, description = '', publishDate = new Date(), image = '', email = '', allMarkers = [], distance = 0) {
      this.title = title
      this.description = description
      this.image = image
      this.publishDate = publishDate
      this.email = email
      this.allMarkers = allMarkers
      this.distance = distance
    }
  }