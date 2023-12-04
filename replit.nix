{ pkgs }: {
  deps = [
    pkgs.gti
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server  
  ];
}