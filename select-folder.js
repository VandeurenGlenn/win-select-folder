import { spawn } from 'child_process';

const selectFolder = ({description, root, newFolderButton}) => `
  function selectFolder {
    [System.Reflection.Assembly]::LoadWithPartialName("System.windows.forms") | Out-Null

    $form = New-Object System.Windows.Forms.FolderBrowserDialog
    $form.showNewFolderButton = ${newFolderButton}
    $form.rootfolder = '${root}'
    $form.description = '${description}'
    $show = $form.showDialog()
    if ($show -eq "OK"){
      return $form.selectedPath
    } else {
      write-error "cancelled"
    }
  }

  $folder = selectFolder
  write-host $folder
`;

/**
 * @param {string} [root='desktop'] - check [specialfolder](https://docs.microsoft.com/en-us/dotnet/api/system.environment.specialfolder?view=netframework-4.7.2) for more options
 * @param {string} [description='Select Folder'] - description
 * @param {boolean} [newFolderButton='true'] - show newFolderButton or not
 *
 * @return {Promise} selected folder or cancelled string
 */
export default (options = {}, folder) => new Promise((resolve, reject) => {
  const {root = 'desktop', description = 'Select Folder', newFolderButton = 1} = options;

  const child = spawn('powershell.exe', [selectFolder({description, root, newFolderButton})]);
  child.stdout.on('data', data => {
    data = data.toString();
    if (data.length > 1) folder = data;
  });
  child.stderr.on('data', data => {
    data = data.toString();
    if (data.includes('cancelled')) resolve('cancelled');
    else reject(data);
  });
  child.on('exit', () => {
    resolve(folder)
  });
  child.stdin.end();
})
