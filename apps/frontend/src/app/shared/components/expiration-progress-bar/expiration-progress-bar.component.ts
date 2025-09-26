import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-expiration-progress-bar",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./expiration-progress-bar.component.html",
  styleUrl: "./expiration-progress-bar.component.scss",
})
export class ExpirationProgressBarComponent implements OnInit {
  @Input() expireDate: string | null = null; // Format: "6/2025"

  daysLeft: number = 0;
  totalDays: number = 0;
  percentageUsed: number = 0;

  get progressColorClass(): string {
    console.log(this.percentageUsed);
    if (this.percentageUsed >= 90) {
      return "bg-error";
    } else if (this.percentageUsed >= 70) {
      return "bg-warning";
    } else {
      return "bg-success";
    }
  }
  ngOnInit(): void {
    if (!this.expireDate) return;

    const [monthStr, yearStr] = this.expireDate.split("/");
    const expireMonth = parseInt(monthStr, 10);
    const expireYear = parseInt(yearStr, 10);

    if (isNaN(expireMonth) || isNaN(expireYear)) return;

    const now = new Date();

    // Početak razdoblja: prvi dan ovog mjeseca
    const start = new Date(now.getFullYear(), now.getMonth(), 1);

    // Kraj razdoblja: zadnji dan unesenog mjeseca
    const end = new Date(expireYear, expireMonth, 0); // 0 = zadnji dan prethodnog mjeseca + 1 = zadnji dan prethodnog mjeseca

    const msInDay = 1000 * 60 * 60 * 24;
    const totalMs = end.getTime() - start.getTime();
    const leftMs = end.getTime() - now.getTime();

    if (leftMs <= 0) {
      this.daysLeft = 0;
      this.percentageUsed = 100;
      this.totalDays = Math.round(totalMs / msInDay); // radi prikaza ako želiš
      return;
    }

    this.totalDays = Math.round(totalMs / msInDay);
    this.daysLeft = Math.round(leftMs / msInDay);

    const daysUsed = this.totalDays - this.daysLeft;
    this.percentageUsed = Math.min(100, Math.max(0, Math.round((daysUsed / this.totalDays) * 100)));
  }
}
