-- Conversa que já existia (04/11/2026, já aplicado): número que não é motorista e já conversava com a locadora
-- antes do robô fica com status 'antiga' em whatsapp_atendimento; o robô não saúda, não chama a Dara e a IA não responde.
alter table public.whatsapp_atendimento drop constraint whatsapp_atendimento_status_check;
alter table public.whatsapp_atendimento add constraint whatsapp_atendimento_status_check check (status = any (array['saudar','aguardando','pergunta_dara','com_dara','humano','encerrado','perguntar','antiga']));
