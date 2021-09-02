# Recuperação de senha

**Requisito funcinal**
-O usuario deve poder recuperar sua senha informando seu email
-O usuario deve poder receber um email com instruções de recuperação de senha
-Usuario deve poder resetar sua senha

**Regra de negocio**
-O link enviado por email deve ser valido por apenas 2h
-O usuario deve confirmar a senha antes de alterala

**Requisito não funcional**
-Usar mailTrap para testar envio de email em ambiemte de desemvolvimento
-Amazom ses para envio de emails em produção
-O envio de email deve ser feito em segundo plano

# Atualização do perfil

**Requisito funcinal**
-O usuario deve poder atualizar seu perfil

**Regra de negocio**
-O usuario nao pode alterar seu email para um email ja utilizado
-Para atualizar a senha o usuario deve informar a senha antiga
-Para atualizar a senha o usuario deve confirmar a nova senha

**Requisito não funcional**

# Painel do prestador

-para o usuario que é prestador
**Requisito funcinal**
-O usuario deve poder listar seus agendamentos de um dia especifico
-O prestador deve poder receber uma notificacao sempre quando alguem agendar com ele
-O prestador deve poder visualizar as notificaçoes nao lidas

**Regra de negocio**
-A notificacao deve ter um status de lida ou nao lida

**Requisito não funcional**
-Os agendamentos do prestador no dia devem ser armazenadas em cache
-As notifications devem ser armazenadas no banco mongoDb
-As notificatosn devem ser enviadas em tempo real utilizando socke io

# Agendamento de serviços

--para o usuario que nao é prestador
**Requisito funcinal**
-O usuario deve poder listar todos os prestadores de serviço
-O usuario deve poder listar os dias de um mes com pelo menos um horario disponivel de um prestador
-O usuario de deve poder listar horarios disponiveeis em um dia especifico de um prestador
-o usuario deve poder realizar um agendamento com um prestador

**Regra de negocio**
-Cada agendamento deve durar uma hora
-Os agendamentos devem estar disponiveis das 8 as 18
-O usuario nao pode agendar em um horario que ja foi agendado por outro usuario
-O usuario nao pode agendar fora do periodo de agendamento
-O usuario nao pode agendar serviços sendo prestador com sigo mesmo

**Requisito não funcional**
-A listagem de prestadores deve ser listada em cache sem precisar buscar denovo do nosso banco de dados
