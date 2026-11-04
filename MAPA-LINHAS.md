# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 04/11/2026, 10:57:03. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (7090 linhas)

16: <!-- Tailwind CSS CDN -->
36: <!-- Font Awesome Icons -->
38: <!-- PDF.js para renderizar PDFs -->
40: <!-- Gera o QR code do Pix a partir do copia e cola -->
42: <!-- Supabase (banco de dados online) -->
160: <!-- Header Principal -->
174: <!-- Controles do Header -->
176: <!-- Botão Status Online/Offline (Motorista) -->
184: <!-- Ativar Notificações -->
189: <!-- Temas -->
194: <!-- Logout Button -->
203: <!-- Conteúdo Principal -->
206: <!-- TELA DE LOGIN -->
207: #secLogin
240: <!-- ESCOLHA DA DEMONSTRAÇÃO (login teste / teste) -->
241: #secDemoEscolha
256: <!-- PAINEL DO MOTORISTA -->
257: #secDriverPanel
259: <!-- Card do Veículo Vinculado -->
274: <!-- Renderizado via JS: Status "Em dia" ou "Em atraso" -->
284: <!-- Botão "Instalar app" (só aparece em celular Android, fora do próprio app) -->
289: <!-- Aviso: nova versão do app Android -->
292: <!-- Aviso vermelho: notificações desligadas -->
295: <!-- Aviso vermelho: CNH vencida (com botão para enviar a nova) -->
299: <!-- Aviso de Pix / pagamento pendente -->
302: <!-- Navegação de Abas -->
320: <!-- Conteúdo das Abas Motorista -->
323: <!-- Aba CRLV-e -->
324: #tabDrvCrlv
329: <!-- Renderizado dinamicamente -->
333: <!-- Aba Contrato -->
334: #tabDrvContract
344: <!-- Renderizado dinamicamente -->
348: <!-- Aba Vistoria -->
349: #tabDrvInspection
356: <!-- Aba Pagamento -->
357: #tabDrvPayment
370: <!-- Caução e multas do motorista -->
372: <!-- Valor e descrição da cobrança -->
382: <!-- Seção Pix -->
395: <!-- QR Code Renderizado aqui -->
420: <!-- Seção Upload de Comprovante -->
437: <!-- Lista de comprovantes -->
447: <!-- PAINEL MASTER (ADMINISTRAÇÃO) -->
448: #secMasterPanel
481: <!-- Aviso: falta criar a tabela dos termos no banco -->
484: <!-- SUB-ABA: GESTÃO DE VEÍCULOS -->
486: <!-- Lista de Veículos -->
502: <!-- Renderizado via JS -->
509: <!-- Form de Adicionar Veículo -->
543: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
549: <!-- Lista de Motoristas -->
566: <!-- Renderizado via JS -->
573: <!-- Form de Adicionar Motorista -->
668: <!-- Barra de baixo do dono (só no design novo) -->
678: <!-- MODAL PRIMEIRO LOGIN -->
679: #modalFirstLogin
713: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
714: #modalNotif
727: <!-- MODAL VISTORIA (MASTER) -->
728: #modalInspection
741: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
742: #modalSettings
801: <!-- MODAL TEMAS -->
802: #modalThemes
813: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
814: #modalCreds
829: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
830: #modalDriverFile
894: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
909: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
951: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
952: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
953: #modalRecibo
973: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
974: #modalPixArea
990: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
991: #modalIA
1073: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1074: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1075: #modalEditVeh
1094: #modalSenha
1116: #modalMeusRecibos
1134: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1135: #modalEmail
1155: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1156: #modalReport
1171: #modalFinance
1244: <!-- FILTROS -->
1292: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1312: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1313: #modalExpenses
1348: <!-- MODAL NOVO PIX -->
1349: #modalNewPix
1401: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1459: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1460: #modalCorrigirRecibo
1474: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
1475: #modalDocViewer
1483: #modalDocBody
1484: <!-- Conteúdo pré-visualizado -->
1490: #modalTerms
1504: <!-- NOTIFICAÇÕES TOAST -->
1521: lsGet()
1522: lsSet()
1523: lsDel()
1546: demoLoginRole()
1550: demoId()
1551: demoSave()
1552: demoSaved()
1554: *datas no horário de Brasília*
1555: demoLocal()
1556: demoParts()
1557: demoDay()
1558: demoNextDue()
1563: *dados fictícios (4 meses)*
1564: demoBuild()
1708: *documentos fictícios (imagem gerada na hora)*
1709: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
1710: demoDocBlob()
1788: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
1789: demoQuery()
1812: out()
1818: run()
1859: demoOnUpdate()
1869: demoOnInsert()
1937: demoClient()
2002: demoStart()
2010: demoStop()
2016: abrirDemo()
2023: trocarDemo()
2028: demoBanner()
2043: toEmail()
2047: showLogin()
2051: esc()
2055: friendlyError()
2065: devicePrefs()
2068: saveDevicePrefs()
2071: docRef()
2072: viewDocIdx()
2074: setBusy()
2112: **TEMAS**
2121: currentTheme()
2126: applyTheme()
2133: openThemes()
2143: pickTheme()
2149: toggleDarkMode()
2151: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
2153: loadDesignCfg()
2160: applyDesign()
2179: markMasterNav()
2184: fillDesignCfg()
2188: saveDesign()
2202: showToast()
2211: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
2212: senhaErro()
2213: abrirSenha()
2222: salvarIaCodigo()
2232: fecharSenha()
2233: salvarSenha()
2254: loginUserInput()
2259: loginErro()
2263: verSenha()
2268: handleLogin()
2317: logout()
2336: saveFirstLoginPreferences()
2358: loadAndRender()
2412: autoRefresh()
2451: markUpdated()
2456: reload()
2461: renderApp()
2509: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
2512: masterBack()
2514: viewAsDriver()
2536: exitViewAs()
2555: viewOnly()
2556: renderViewAsBanner()
2566: showSection()
2572: toggleDriverStatus()
2581: isOnline()
2583: updateStatusToggleUI()
2596: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
2605: checkApkUpdate()
2621: updateInstallApkButton()
2641: renderDriverPanel()
2810: switchDriverTab()
2825: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
2828: parsePixKey()
2832: normalizePixKey()
2840: pixKeyLooksOk()
2848: togglePixKeyFields()
2854: updatePixKeyPlaceholder()
2860: copyPixKey()
2867: copyPixCode()
2879: receiptBadge()
2889: receiptMasterBox()
2914: receiptAction()
2921: confirmReceipt()
2928: rejectReceipt()
2937: recheckReceipt()
2946: uploadReceipt()
2969: switchMasterTab()
2986: maskPhone()
2995: waLink()
3000: allVeh()
3001: renderMasterPanel()
3114: handleAddVehicle()
3147: deleteVehicle()
3148: cancelDeleteVehicle()
3150: confirmDeleteVehicle()
3168: abrirEditarVeiculo()
3187: fecharEditarVeiculo()
3188: salvarEditarVeiculo()
3218: drvCauMostra()
3225: drvCauLer()
3232: handleAddDriver()
3310: updateDriverPaymentStatus()
3319: deleteDriver()
3320: cancelDeleteDriver()
3322: confirmDeleteDriver()
3339: prepareFile()
3361: uploadFile()
3372: fileUrl()
3383: downloadName()
3387: renderFilePreview()
3407: renderPdfToCanvas()
3434: viewDoc()
3455: **DINHEIRO**
3456: parseMoney()
3463: fmtMoney()
3464: fmtDate()
3465: todayISO()
3467: **CONFIGURAÇÕES (Gemini e Google Drive)**
3469: loadConfigStatus()
3474: paintConfig()
3479: openSettings()
3489: closeSettings()
3490: saveConfig()
3500: **ASAAS (Financeiro) — chaves ficam em app_secrets; master_asaas_info mostra o que já existe**
3501: loadAsaasInfo()
3514: saveAsaas()
3522: **PICPAY (Financeiro) — mesmas regras do Asaas; os segredos ficam em app_secrets**
3523: loadPicpayInfo()
3535: savePicpay()
3543: savePicpayCred()
3554: testarPicpay()
3561: copiarAsaas()
3565: testDrive()
3572: resyncDrive()
3580: **FICHA DO MOTORISTA**
3583: openDriverFile()
3612: closeDriverFile()
3614: saveDriverFile()
3662: aiFillDriver()
3701: **CONTROLE FINANCEIRO**
3702: finRange()
3719: dayBR()
3720: inRange()
3722: onFinPeriodChange()
3728: fillFinFilters()
3735: clearFinFilters()
3739: updateFinFilterCount()
3748: openFinance()
3753: switchFinTab()
3763: closeFinance()
3765: renderFinance()
3828: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
3830: okEmail()
3832: openEmailCompose()
3853: closeEmailCompose()
3854: sendEmailCompose()
3869: emailRecibo()
3874: emailIA()
3882: **RELATÓRIO DO FINANCEIRO**
3884: finFiltersText()
3889: finPeriodText()
3896: buildReportHtml()
3918: openFinReport()
3928: closeFinReport()
3929: printFinReport()
3933: shareFinReport()
3943: emailFinReport()
3949: **DESPESAS DO VEÍCULO**
3951: openExpenses()
3963: closeExpenses()
3964: fillExpenseTypes()
3969: createExpenseType()
3984: aiReadExpense()
4016: renderExpenses()
4038: saveExpense()
4065: deleteExpense()
4086: photoCard()
4115: inspectionHtml()
4141: hydrateImages()
4147: openInspection()
4155: closeInspection()
4159: renderInspectionModal()
4166: uploadInspection()
4197: deleteInspectionPhoto()
4213: fmtDue()
4219: nextDueLocal()
4230: openNewPix()
4259: **CAUÇÃO DO MOTORISTA**
4260: cauOf()
4261: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
4262: devOf()
4263: devCobrancas()
4265: devPrevisao()
4273: dfDevRender()
4300: dfDevIr()
4301: dfDevSalvar()
4306: dfDevAvisar()
4312: dfDevDesfazer()
4316: dfDevReceber()
4325: cauNext()
4332: dfCauFill()
4342: dfCauCalc()
4359: dfCauRead()
4372: **CAUÇÃO: quanto já foi pago**
4374: cauStatus()
4384: obsResumoHtml()
4385: cauResumoHtml()
4390: **MULTAS E OUTRAS DESPESAS**
4391: multasOf()
4393: multaPagaAuto()
4398: multasAbertas()
4399: multasPendentes()
4400: multasResumoHtml()
4408: cobOf()
4409: dfCobFill()
4415: dfCobRead()
4418: dfCobInfo()
4428: cobResumoHtml()
4432: ajustesOf()
4434: previsaoProxima()
4447: previsaoHtml()
4451: dfAjRender()
4457: addAjuste()
4463: delAjuste()
4466: abrirAjustes()
4467: renderProxCobrancas()
4473: savePixExtra()
4481: dfMultFill()
4489: fdPaga()
4490: dfMultRender()
4499: toggleMultas()
4506: addMulta()
4514: delMulta()
4519: multaPaga()
4525: renderDriverExtras()
4552: mondayAfter()
4560: renderDriverProfileExtras()
4608: semanaDoPix()
4614: **MEUS RECIBOS (área do motorista)**
4616: meusRecibosLista()
4620: openMeusRecibos()
4634: closeMeusRecibos()
4635: reciboPdfHtml()
4646: verMeuRecibo()
4653: voltarMeusRecibos()
4654: pdfMeuRecibo()
4658: shareMeuRecibo()
4665: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
4666: editVehicleRent()
4678: nextParcel()
4684: fillNewPixValues()
4720: newPixParts()
4751: **PERÍODO E VENCIMENTO DA COBRANÇA**
4752: dataISO()
4753: dataDe()
4754: dataMais()
4755: dataBR()
4756: diasEntre()
4757: isoSP()
4758: pixPeriodo()
4765: pixDesc()
4766: pixDiasPeriodo()
4770: pixDatasNovo()
4779: pixDatasMudou()
4790: pixAluguelProporcional()
4798: pixPeriodoInfo()
4811: pixAddLinha()
4818: pixLinhas()
4820: descSoma()
4830: calcNewPix()
4839: **RECIBO DE PAGAMENTO**
4843: receiptValue()
4844: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
4845: atrasoDados()
4852: cobrarAtraso()
4868: allocatePix()
4887: reciboData()
4910: fmtDateTimeBR()
4911: reciboTexto()
4962: openRecibo()
4981: closeRecibo()
4982: **CORRIGIR RECIBO**
4984: corrigirLinhaHtml()
4994: openCorrigirRecibo()
5017: closeCorrigirRecibo()
5018: corrigirLer()
5024: corrigirSoma()
5031: salvarCorrigirRecibo()
5048: copyRecibo()
5053: reciboCanvas()
5069: shareReciboImage()
5084: rotularTabelas()
5104: areaAberta()
5105: markAreas()
5108: closeAreas()
5112: toggleArea()
5122: dobraSalva()
5123: setDobra()
5128: toggleDobra()
5135: dobraTopo()
5142: renderMasterResumo()
5156: loadIA()
5177: updateIABadge()
5182: loadIASetting()
5188: paintIASwitch()
5194: toggleIA()
5201: loadRobo()
5207: paintRobo()
5235: pedirCodigoRobo()
5244: toggleRobo()
5256: iaTodosGerar()
5274: iaTodosCancelar()
5278: iaTodosConfirmar()
5292: loadIARules()
5297: iaAbrirPdf()
5303: renderIARules()
5307: saveIARules()
5312: addIARule()
5317: delIARule()
5321: openIA()
5334: closeIA()
5335: iaShow()
5336: iaPhone()
5341: renderIA()
5383: iaAprovar()
5392: iaPhone2()
5393: iaSend()
5404: iaMark()
5413: iaDelete()
5422: openPixArea()
5431: closePixArea()
5432: renderPixArea()
5468: openEditPix()
5497: deletePix()
5509: closeNewPix()
5511: saveNewPix()
5602: pushSupported()
5603: isIOS()
5604: isStandalone()
5605: b64ToBytes()
5611: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
5616: notifStatus()
5624: stepsList()
5628: notifHelpHtml()
5662: renderNotifModal()
5674: checkDriverNotifications()
5705: activateFromModal()
5716: refreshNotifButton()
5735: subscribePush()
5750: enableNotifications()
5768: closeDocViewer()
5776: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
5788: allFeaturesOn()
5789: feat()
5790: loadDriverFeatures()
5797: saveDriverFeatures()
5801: drawFeatureToggles()
5816: setAllFeatures()
5821: applyDriverFeatures()
5835: **PIX: conferência do código e QR code desenhado no aparelho**
5836: crc16()
5844: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
5846: pixTxt()
5847: pixCampo()
5848: pixGerarCodigo()
5858: pixAutoLigado()
5859: pixAutoMudou()
5864: gerarPixAuto()
5880: pixRecebedorCarregar()
5891: pixRecebedorGuardar()
5898: pixValid()
5904: renderPixQr()
5914: previewNewPixQr()
5924: **FOTO DO MOTORISTA (recortada da CNH)**
5925: photoPath()
5926: fileToCanvas()
5945: cropPhoto()
5959: savePhoto()
5964: photoBoxFrom()
5970: fillAvatar()
5981: fillAvatars()
5994: storedFile()
6001: photoFromCnh()
6013: **FOTO DO PERFIL ACOMPANHA A CNH**
6016: cnhStamp()
6017: photoFiles()
6025: avatarPath()
6030: syncCnhPhotos()
6053: pickImage()
6056: changeDriverPhoto()
6072: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
6074: uploadTmp()
6081: clearTmp()
6086: aiReadFiles()
6092: okDateISO()
6094: noAccents()
6096: makeUsername()
6105: titleCase()
6106: syncNewDriverAccess()
6112: setNewDriverPhoto()
6117: pickNewDriverPhoto()
6121: resetNewDriverForm()
6129: newDriverDocChosen()
6163: anoCrlv()
6164: aiReadCrlv()
6181: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
6182: sendWelcomeEmail()
6188: showCredentials()
6199: demoAssistente()
6218: **PERGUNTAR À IA (ÁREA IA, só o master)**
6222: iaChatReset()
6223: iaNorm()
6224: iaAcha()
6230: iaVeicTxt()
6231: iaCamposVeic()
6232: iaDataOk()
6233: iaOpcoes()
6234: iaTodosMotoristas()
6238: iaFerramenta()
6327: renderIAChat()
6344: iaChatDica()
6345: iaChatEnviar()
6380: iaChatNota()
6381: iaCancelarCartao()
6382: iaConfirmarCartao()
6425: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
6426: renderAppEarnings()
6490: saveAppEarning()
6515: workDayISO()
6516: renderDayOff()
6527: setDayOff()
6537: aiReadEarning()
6570: **DESPESAS DO APLICATIVO**
6572: appExpCustomTypes()
6573: fillAppExpTypes()
6580: onAppExpTypeChange()
6585: saveAppExpense()
6609: deleteAppExpense()
6616: deleteAppEarning()
6711: loadTermsAcceptances()
6723: termsOf()
6724: currentAcceptance()
6725: needsTermsAcceptance()
6728: fmtDateTime()
6731: termsPlainText()
6735: termsHash()
6743: openTermsGate()
6766: termsGateCheck()
6774: acceptTerms()
6794: acceptanceHtml()
6805: openTermsViewer()
6823: closeTerms()
6829: downloadTermsCopy()
6850: termsBadgeMaster()
6857: termsMasterDetail()
6898: renderTermsSetupBanner()
6911: copyTermsSql()
6921: cnhExpired()
6922: cnhWaiting()
6923: onlyDigits()
6924: normName()
6926: verifyCnh()
6938: renderCnhBanner()
6956: sendNewCnh()
7004: cnhBadgeMaster()
7012: applyPendingCnh()
7020: autoReadNewCnhs()
7038: cnhPendingHtml()
7052: recheckPendingCnh()
7062: rejectPendingCnh()
7072: showContractDoc()

## sw.js (61 linhas)

(sem itens)

## robo-whatsapp/nucleo.js (753 linhas)

24: mascarar()
27: numeroBR()
33: empacotar()
43: credsValido()
48: abrirPacote()
62: abrirConteudo()
72: textoDe()
81: contatoOculto()
84: novoIdRobo()
85: ehDoRobo()
88: numeroDoJid()
90: criarRobo()
93: hora()
94: log()
104: pareado()
105: limparLocal()
107: motoraBruto()
118: motora()
124: avisarErroPareamento()
126: *conexão guardada no Supabase*
127: existeGuardada()
128: restaurar()
162: guardar()
190: agendarBackup()
196: *conexão com o WhatsApp*
197: agendarAbrir()
202: backoff()
207: falhaAoAbrir()
209: soltarSocket()
216: abrir()
247: *conversa que já existia (pedido do dono, 04/11/2026)*
251: aoHistorico()
259: conversaAntiga()
271: aoMudar()
300: esquecerConexao()
306: aoCair()
322: reabrirQr()
345: *conectar pelo número*
346: verificarPareamento()
387: *fila de envio*
388: mandar()
389: conteudoDe()
390: enviar()
407: enviarCopias()
429: marcarEnviada()
436: verReinicio()
447: sinalDeVida()
460: ciclo()
495: *mensagens recebidas (comprovante de motorista e resposta do dono)*
498: aoReceber()
505: telefoneDe()
514: avisarArquivoSemNumero()
521: comRepeticao()
529: responder()
534: tratarRecebida()
591: *atendimento de número desconhecido (saudação, aviso à Dara e conversa intermediada)*
593: destino()
601: encaminhar()
606: ouvirDono()
618: entregarAtendimento()
643: pessoaRespondeu()
656: chamarDara()
679: cicloAtendimento()
684: receberArquivo()
703: *página do QR*
704: pagina()
718: *laços*
719: repetir()
726: iniciar()
737: encerrar()

## robo-whatsapp/robo.js (28 linhas)

(sem itens)

## supabase/functions/motora-asaas/index.ts (249 linhas)

20: serviceKey()
26: json()
27: brl()
30: secret()
35: asaas()
48: avisar()
58: hojeBR()
59: proximoDia()
66: proximaParcela()
75: cobrarMotorista()
88: *valores (mesma regra do Novo Pix)*
114: *QR code Pix estático com o valor da semana (sem taxa até 100 Pix/mês)*
136: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
156: cobrarTodos()
168: *pagamento recebido*
169: quemPagou()
192: pagamentoRecebido()
242: acao "cobrar"

## supabase/functions/motora-assistente/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-assistente/index.ts (93 linhas)

7: serviceKey()
18: json()
20: secret()
24: ehMaster()
32: regrasDono()
38: s()
39: n()
52: instrucoes()

## supabase/functions/motora-backup/index.ts (99 linhas)

10: serviceKey()
16: json()
24: secret()
29: lerTabela()

## supabase/functions/motora-codigo/index.ts (113 linhas)

7: serviceKey()
13: json()
14: secret()
18: guarda()
22: gh()
27: shaArq()
28: textoEm()
29: b64()
33: aplica()
46: palavraCerta()

## supabase/functions/motora-dono/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-dono/index.ts (471 linhas)

9: serviceKey()
15: json()
16: secret()
22: brl()
23: hoje()
24: diaBR()
25: fmtDia()
26: norm()
27: dataOk()
28: num()
29: veicTxt()
30: dig()
39: opcoes()
46: dados()
56: distribui()
66: soma()
69: formaPagar()
98: *as ferramentas: consultar_* respondem; propor_* devolvem {pedido} e nada é gravado aqui*
99: ferramenta()
102: carroDe()
103: umMotorista()
104: umCarro()
127: s()
168: pede()
242: mudaExtra()
247: falha()
248: executar()
292: s()
293: obj()
322: instrucoes()
339: lerDecisao()
341: aparar()
346: salvar()
349: atender()
412: *áudio: a IA ouve o dono e responde falando (sempre com modelos alternativos). A palavra secreta nunca vale por áudio*
413: transcreve()
418: fala()
435: mp3()

## supabase/functions/motora-lembretes/index.ts (288 linhas)

15: serviceKey()
21: json()
22: brl()
26: secret()
31: hojeBR()
32: diaBR()
33: proximoDia()
40: previsao()
54: formaAuto()
56: avisoDono()
81: avisoMotorista()
102: emAberto()
114: avisoAtraso()
132: **4) PIX AUTOMÁTICO DO MOTORA**
134: crc16()
139: campo()
140: txtPix()
141: codigoPix()
148: chaveNormal()
155: proximaParcela()
163: pixAutomatico()
170: *valores (mesma regra do Novo Pix e do Asaas)*
195: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
216: pixAutoTodos()
240: enviar()
249: lembrar()

## supabase/functions/motora-ler-veiculos/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-ler-veiculos/index.ts (58 linhas)

6: serviceKey()
12: json()
13: secret()
35: aceita()
43: norm()

## supabase/functions/motora-picpay/index.ts (267 linhas)

16: serviceKey()
23: json()
24: brl()
27: secret()
32: hostPicpay()
37: tokenPicpay()
51: picpay()
61: avisar()
70: hojeBR()
71: proximoDia()
78: proximaParcela()
87: telefone()
94: cobrarMotorista()
111: *valores (mesma regra do Novo Pix e do Asaas)*
137: *cobrança Pix: o QR vale até 23:59 do vencimento*
156: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
175: *pagamento recebido: sempre confere na API do PicPay antes de dar baixa*
176: conferirCobranca()
211: cobrarTodos()
225: ehMaster()
241: acao "cobrar"
245: acao "testar"

## supabase/functions/motora-push/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-push/index.ts (437 linhas)

12: serviceKey()
23: json()
25: secret()
31: vapid()
45: copiaWhatsAppDono()
55: sendTo()
75: masterIds()
80: fmtDue()
84: fmtDia()
87: safeUrl()
89: **ÁREA IA (mensagens de WhatsApp)**
90: brl()
92: pixKey()
99: setting()
103: iaAtiva()
105: roboFuncionando()
111: baseMessage()
115: textoNovoPix()
122: regrasDono()
127: lerMensagem()
136: iaEscreve()
153: iaReescreveTodos()
167: motoristasDoAviso()
173: reciboDados()
198: gerarPdfRecibo()
202: limpa()
222: queueWhatsApp()
247: norm()
270: **fim da Área IA**
276: textoBoasVindas()
295: sendToDriver()
308: type "public_key"
317: type "sunday"
325: type "recibo_teste"
329: type "master_alert"
333: type "driver_alert"
345: type "test"
353: type "aprovar_msg"
364: type "todos_rascunho"
372: type "todos_enviar"
382: type "new_pix"
394: type "boas_vindas"
409: type "cobranca"

## supabase/functions/motora-robo/comandos.ts (226 linhas)

3: chaveFone()
10: chaveContato()
18: lerComando()
23: norm()
27: escolher()
32: nomeNoInicio()
41: lista()
54: extensao()
63: *atendimento de número desconhecido*
64: foneBonito()
73: primeiroNome()
76: saudacao()
82: textoDara()
86: promptDara()
98: lerMensagemIA()
107: avisoDaraValido()
112: *a IA tira dúvidas de quem quer alugar, só com os dados do app*
114: reais()
116: ofertaVeiculo()
123: promptCliente()
138: lerRespostaCliente()
148: valoresConferem()
155: textoDaraSim()
159: lerDecisao()
165: promptResumo()
170: lerResumo()
178: *urgência da mensagem do motorista: quanto mais urgente, mais rápido chama a Dara*
184: nivelPorPalavras()
191: promptNivel()
201: lerNivel()
210: textoDaraMotorista()
216: escolherConversa()

## supabase/functions/motora-robo/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-robo/index.ts (435 linhas)

15: serviceKey()
21: json()
23: secret()
28: ehDono()
33: motoristaDoFone()
42: nivelDaMensagem()
55: resumoDe()
66: respostaCliente()
79: aceita()
85: falaCliente()
91: avisoDara()
95: aceita()
109: acao "pendentes"
136: acao "enviada"
142: acao "falhou"
154: *mensagens RECEBIDAS: só valem com o envio automático ligado*
157: *número desconhecido: saúda, em 3 min sem resposta chama a Dara e intermedia a conversa*
159: rotulo()
160: acao "atendimento"
280: acao "audio_dono"
285: acao "locadora_respondeu"
291: acao "atendimento_fila"
321: acao "atendimento_ok"
330: acao "atendimento_falhou"
335: acao "mensagem"
359: acao "comprovante_url"
378: acao "comprovante_salvar"
388: acao "comprovante_sem_numero"
393: acao "qr"
400: acao "parear_ver"
404: acao "parear_codigo"
411: acao "sessao_existe"
415: acao "sessao_enviar"
420: acao "sessao_baixar"
425: acao "sessao_apagar"

## SQL aplicado no Supabase (supabase/*.sql)

- supabase/2026-11-01-novidades.sql: MOTORA — novidades de 01/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-asaas-config.sql: MOTORA — 02/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-periodo-cobranca.sql: MOTORA — período, vencimento e correção de recibo por cobrança (02/11/2026)
- supabase/2026-11-02-picpay.sql: MOTORA — 02/11/2026: pagamento automático pelo PicPay (conta PJ), como opção ao Asaas na ficha do motorista.
- supabase/2026-11-03-atendimento.sql: Atendimento de número desconhecido pelo robô (só o robô usa, pela função motora-robo)
- supabase/2026-11-03-atraso.sql: MOTORA — 03/11/2026 (APLICADO)
- supabase/2026-11-03-checa-robo.sql: Checagem do robô a cada 30 s: avisa o dono uma vez quando para e outra quando volta
- supabase/2026-11-03-devolucao-aprovar.sql: Depois do botão de devolução, nenhuma mensagem sai para o motorista sem a aprovação do dono
- supabase/2026-11-03-dono-assistente.sql: Conversa do dono com a IA pelo WhatsApp e o pedido que espera o SIM. Só as funções do servidor leem e gravam.
- supabase/2026-11-03-ia-codigo.sql: Palavra secreta e chave do GitHub da IA do dono: só o master grava; ninguém lê pelo app. A palavra fica só como resumo (hash).
- supabase/2026-11-03-ia-ganhos-app.sql: A IA do WhatsApp (motora-dono) grava ganhos e despesas de aplicativo depois do SIM do dono
- supabase/2026-11-03-lembretes.sql: MOTORA — 03/11/2026 (APLICADO em 03/11/2026)
- supabase/2026-11-03-whatsapp-dono.sql: WhatsApp do dono: avisos do master no número dele e confirmação de comprovante por resposta.
- supabase/2026-11-04-conversa-antiga.sql: Conversa que já existia (04/11/2026, já aplicado): número que não é motorista e já conversava com a locadora
- supabase/2026-11-04-pix-automatico.sql: Pix automático do MOTORA e lembrete do meio-dia (já aplicado em 04/11/2026)
