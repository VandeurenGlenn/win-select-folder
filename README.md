# win-select-folder
> Windows FolderBrowserDialog Form.

![hero]

## install
```sh
npm i --save win-select-folder
```

## usage
```js
import selectFolder from 'win-select-folder';

const root = 'myComputer'; // rootfolder - default desktop
const description = 'some description'; // default Select Folder
const newFolderButton = 0; // whether or not to show the newFolderButton - default 1

selectFolder({root, description, newFolderButton})
  .then(result => {
    if (result === 'cancelled') console.log('Cancelled by user');
    else console.log(result); // logs selected folder
  })
  .catch(err => console.error(err))

```

## API winSelectFolder([options])
### options
`root`: rootfolder  - check [specialfolder](https://docs.microsoft.com/en-us/dotnet/api/system.environment.specialfolder?view=netframework-4.7.2) for options, defaults to 'desktop'<br>
`description`: short description - defaults to 'Select Folder'<br>
`newFolderButton`: whether or not to show - defaults to 1


## license
[MIT](LICENSE) (c) 2019 Glenn Vandeuren <vandeurenglenn@gmail.com>

[hero]: https://raw.githubusercontent.com/VandeurenGlenn/win-select-folder/master/hero.png "Hero"
