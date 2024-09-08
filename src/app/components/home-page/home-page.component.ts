import { CommonService } from './../../services/common.service';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { PhotosCardComponent } from '../photos-card/photos-card.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { FormsModule } from '@angular/forms';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    PhotosCardComponent,
    CommonModule,
    LoaderComponent,
    FormsModule,
    ImageModalComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'], // Fixed styleUrls to be plural
})
export class HomePageComponent implements OnInit {
  @ViewChild('navSearchBar') navSearchBar!: ElementRef;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const imageHeight = window.innerHeight * 0.6;

    // Check if scrolled to the bottom of the page
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      this.loadMoreImage();
    }

    // Show or hide the search bar in the navbar based on scroll position
    if (window.scrollY > imageHeight) {
      this.navSearchBar.nativeElement.style.display = 'block';
    } else {
      this.navSearchBar.nativeElement.style.display = 'none';
    }
  }

  constructor(
    private authService: AuthServiceService,
    private commonService: CommonService
  ) {}

  totalCount: number = 0;
  perPageData: number = 15;
  currentPage: number = 1;
  isLoading: boolean = false;
  noFurtherContent: boolean = false;
  photosData: any[] = [];
  url: string = '';
  searchQuery: string = '';

  ngOnInit(): void {
    this.getApiData();
  }
  logout() {
    this.authService.logout();
  }

  getApiData() {
    this.isLoading = true;

    // Set the URL based on whether there is a search query
    this.url = this.searchQuery
      ? `https://api.pexels.com/v1/search?query=${this.searchQuery}&per_page=${this.perPageData}&page=${this.currentPage}`
      : `https://api.pexels.com/v1/curated?per_page=${this.perPageData}&page=${this.currentPage}`;

    this.commonService.getData(this.url).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.noFurtherContent = false;
        this.photosData = [...this.photosData, ...response?.photos];
        this.totalCount = response?.total_results;
      },
      (error) => {
        console.log('error', error);
        this.isLoading = false;
      }
    );
  }

  loadMoreImage() {
    if (this.currentPage * this.perPageData >= this.totalCount) {
      this.noFurtherContent = true;
      return;
    }

    this.currentPage++;

    this.getApiData();
  }

  onSearchingQuery() {
    this.searchImages();
  }

  searchImages() {
    this.currentPage = 1; // Reset to the first page
    this.photosData = []; // Clear the existing data to show new search results
    this.getApiData(); // Fetch the first page of the new search results
  }
}
