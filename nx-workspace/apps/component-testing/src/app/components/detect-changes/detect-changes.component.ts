import {
  Component,
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy
} from '@angular/core';

/**
 * demonstrates the life-cycle hooks invoked
 * by `ComponentFixture{T}.detectChanges()`.
 *
 * [https://angular.io/guide/lifecycle-hooks#lifecycle-sequence]
 *
 * @export
 * @class DetectChangesComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'nx-workspace-detect-changes',
  templateUrl: './detect-changes.component.html',
  styleUrls: ['./detect-changes.component.scss']
})
export class DetectChangesComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy {
  myValue = -1;

  constructor() {
    console.log(`${DetectChangesComponent.name} constructor`);
  }

  /**
   * Respond when Angular (re)sets data-bound input properties.
   * The method receives a SimpleChanges object of current and previous property values.
   *
   * Called before `ngOnInit()` and whenever one or more data-bound input properties change.
   *
   * @param {import("@angular/core").SimpleChanges} changes
   * @memberof DetectChangesComponent
   */
  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    console.log('ngOnChanges');
  }

  /**
   * Initialize the directive/component after Angular first displays the data-bound properties
   * and sets the directive/component's input properties.
   *
   * Called _once_, after the first `ngOnChanges()`.
   *
   * @memberof DetectChangesComponent
   */
  ngOnInit() {
    console.log('ngOnInit');
    this.myValue = 100;
  }

  /**
   * Detect and act upon changes that Angular can't or won't detect on its own.
   *
   * Called during every change detection run, immediately after `ngOnChanges()` and `ngOnInit()`.
   *
   * @memberof DetectChangesComponent
   */
  ngDoCheck(): void {
    console.log('ngDoCheck');
  }

  /**
   * Respond after Angular projects external content into the component's view / the view that a directive is in.
   *
   * Called _once_ after the first `ngDoCheck()`.
   *
   * @memberof DetectChangesComponent
   */
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }

  /**
   * Respond after Angular checks the content projected into the directive/component.
   *
   * Called after the `ngAfterContentInit()` and every subsequent `ngDoCheck()`.
   *
   * @memberof DetectChangesComponent
   */
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }

  /**
   * Respond after Angular initializes the component's views and child views / the view that a directive is in.
   *
   * Called _once_ after the first `ngAfterContentChecked()`.
   *
   * @memberof DetectChangesComponent
   */
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  /**
   * Respond after Angular checks the component's views and child views / the view that a directive is in.
   *
   * Called after the `ngAfterViewInit()` and every subsequent `ngAfterContentChecked()`.
   *
   * @memberof DetectChangesComponent
   */
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }

  /**
   * Cleanup just before Angular destroys the directive/component.
   * Unsubscribe Observables and detach event handlers to avoid memory leaks.
   *
   * Called just before Angular destroys the directive/component.
   *
   * @memberof DetectChangesComponent
   */
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }
}
