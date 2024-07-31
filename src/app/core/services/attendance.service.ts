import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http:HttpClient) { }

  submitAttendance(attendanceData : any):Observable<any>{
    return this.http.post<any>('project/attendance/mark-attendance',attendanceData);
  }


  getAttendanceData(companyId: string, projectId: string, date: Date): Observable<any> {
    const formattedDate = this.formatDate(date); // Format date as needed by backend

   
    let params = new HttpParams()
      .set('companyId', companyId)
      .set('projectId', projectId)
      .set('date', formattedDate);

    return this.http.get<any>(`project/attendance`, { params });
  }


  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
