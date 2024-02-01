User {
   jewels: {
                   power: 0,
                    mind: 0,
                    space: 0
                 }
}




//ssh key config

Lucas Perdigão7:37 p.m.
ls -al ~/.ssh
Tú7:38 p.m.
PS C:\Users\johnn\OneDrive\Documentos\ProjectByPollo\culturepower> ls -al ~/.ssh
Get-ChildItem : Não é possível localizar um parâmetro que coincida com o nome de 
parâmetro 'al'.
No linha:1 caractere:4
+ ls -al ~/.ssh
+    ~~~
    + CategoryInfo          : InvalidArgument: (:) [Get-ChildItem], ParameterBinding 
   Exception
    + FullyQualifiedErrorId : NamedParameterNotFound,Microsoft.PowerShell.Commands.G 
   etChildItemCommand
Lucas Perdigão7:38 p.m.
Get-ChildItem -Path $env:USERPROFILE\.ssh
Lucas Perdigão7:39 p.m.
ssh-keygen -t rsa -b 4096 -C "seu-email@example.com"
ssh-add $env:USERPROFILE\.ssh\id_rsa
Tú7:40 p.m.
PS C:\Users\johnn\OneDrive\Documentos\ProjectByPollo\culturepower> ssh-add $env:USERPROFILE\.ssh\id_rsa
Error connecting to agent: No such file or directory
Lucas Perdigão7:41 p.m.
Start-Service ssh-agent
Tú7:41 p.m.
PS C:\Users\johnn\OneDrive\Documentos\ProjectByPollo\culturepower> Start-Service ssh-agent
Start-Service : O serviço 'OpenSSH Authentication Agent (ssh-agent)' não pode ser 
iniciado devido ao seguinte erro: Não é possível iniciar o serviço ssh-agent no       
computador '.'.
No linha:1 caractere:1
+ Start-Service ssh-agent
+ ~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : OpenError: (System.ServiceProcess.ServiceController:Se  
   rviceController) [Start-Service], ServiceCommandException
Lucas Perdigão7:43 p.m.
eval "$(ssh-agent -s)"
Lucas Perdigão7:45 p.m.
ssh-add ~/.ssh/id_rsa
Tú7:45 p.m.
$ eval "$(ssh-agent -s)"
bash: $'\302\226\302\226\302\226\302\226eval': command not found

johnn@DESKTOP-FPIHGAL MINGW64 ~/OneDrive/Documentos/copy project3 allfiles
$ ssh-add ~/.ssh/id_rsa
Could not open a connection to your authentication agent.

johnn@DESKTOP-FPIHGAL MINGW64 ~/OneDrive/Documentos/copy project3 allfiles
$
Lucas Perdigão7:46 p.m.
eval $(ssh-agent)
ssh-add ~/.ssh/id_rsa
Lucas Perdigão7:48 p.m.
cat ~/.ssh/id_rsa.pub
Lucas Perdigão7:50 p.m.
ssh -T git@github.com


1 - Validar se existe um token no header
2 - Validar o token
3 - Ir para o proximo


1 - Pegar o usuário pelo id
2 - Somar a quantidade de joias do usuário  com a quantidade do parametro


Update Push with mongoose/

/users/:user_id/claims/:product_id