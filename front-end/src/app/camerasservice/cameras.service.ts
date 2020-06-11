/*
Created by Cheng Zeng
Updated on 11/06/2020
The camera service is responsible for the communication with the RESTFul server regarding Camera.
All functions provided in this file are used to perform operation on Camera document in the database.
*/

import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"}),
};

@Injectable({
  providedIn: 'root'
})

export class CamerasService {
  
  // HttpClient provides HTTP service
  constructor(private http: HttpClient) {}

  
  /**
   * Get camera objects from MongoDB database
   * @return An array of camera json objects or nothing
   */
  getCameras() {
    return this.http.get('/cameras');
  }

  /**
   * Get a single camera object from MongoDB database
   * @param id Camera ID used to search for a camera
   * @return A camera json object or nothing
   */
  getCamera(id: string) {
    let url = '/cameras/' + id;
    return this.http.get(url);
  }

  /**
   * Create a new camera document in MongoDB database
   * @param data A camera json objec
   * @return An array of camera json objects after creating
   */
  createCamera(data) {
    return this.http.post('/cameras', data, httpOptions);
  }

  /**
   * Update a camera document in MongoDB database
   * @param id Camera ID used to search for a camera
   * @param data A json object used to update the camera
   * @return The updated camera json object
   */
  updateCamera(id, data) {
    let url = '/camera/' + id;
    return this.http.put(url, data, httpOptions);
  }

}
