# Karma-Jasmine `Component` testing

## detect changes

This [sample](./src/app/components/detect-changes) explores the details around `fixture.detectChanges()`, leading into the life-cycle hooks of Angular components.

### additional resources

- [Angular Guide: `detectChanges()`](https://angular.io/guide/testing#detectchanges)
- “[Everything you need to know about change detection in Angular](https://blog.angularindepth.com/everything-you-need-to-know-about-change-detection-in-angular-8006c51d206f)”

## reactive forms vs. template forms

These samples, [reactive forms](./src/app/components/reactive-forms) and [template forms](./src/app/components/template-forms) go into detail about the differences. Spoiler alert: the Angular team wants us to use reactive forms.

Template forms require name (or `[ngModelOptions]="{standalone: true}"`) and `[(ngModel)]` on every input.

Reactive forms require `formControlName` on every input.

Template forms require template reference variables (`#email="ngModel"`), built-in HTML validators and/or custom validation directives for validation patterns.

Reactive forms use Validators in a `FormGroup` in Component code.

The [source code shows us](https://github.com/angular/angular/blob/7.0.0/packages/forms/src/directives/validators.ts) that there are only about six validator directives (used by template forms), most of them based on the `Validators` object (used by reactive forms).

The top-level concept of template forms is `NgForm`, exposed through `@ViewChild`.

The top-level concept of reactive forms is `FormGroup`, exposed through the binding of plain-old Component object property.

Testing a template form requires synchronous code while reactive-form tests can be synchronous.

### additional resources

- “[Angular Reactive Forms Basics Guide](https://angularfirebase.com/lessons/basics-reactive-forms-in-angular/)” by Jeff Delaney
- [Angular Guide: Reactive Forms](https://angular.io/guide/reactive-forms)
- “[Real World Angular–Part 9.2: Even More Unit Tests [Testing Reactive Forms]](https://blog.realworldfullstack.io/real-world-angular-part-9-2-even-more-unit-tests-f903df40530a)” by Akshay Nihalaney
- [Angular Guide: Template-Driven Forms](https://angular.io/guide/forms)
- [Angular Guide: Template-driven validation](https://angular.io/guide/form-validation#template-driven-validation)

## simple `input`: testing a checkbox

This [sample](./src/app/components/simple-input) shows us that a test for verifying that a checkbox is checked must be asynchronous.

@[BryanWilhite](https://twitter.com/BryanWilhite)
