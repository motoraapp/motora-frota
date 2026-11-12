# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 12/11/2026, 00:37:47. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (7228 linhas)

16: <!-- Tailwind CSS CDN -->
36: <!-- Font Awesome Icons -->
38: <!-- PDF.js para renderizar PDFs -->
40: <!-- Gera o QR code do Pix a partir do copia e cola -->
42: <!-- Supabase (banco de dados online) -->
157: <!-- Sistema de design do MOTORA: cores, tipografia e componentes -->
162: <!-- Header Principal -->
176: <!-- Controles do Header -->
178: <!-- Botão Status Online/Offline (Motorista) -->
186: <!-- Ativar Notificações -->
191: <!-- Temas -->
196: <!-- Logout Button -->
205: <!-- Conteúdo Principal -->
208: <!-- TELA DE LOGIN -->
209: #secLogin
242: <!-- ESCOLHA DA DEMONSTRAÇÃO (login teste / teste) -->
243: #secDemoEscolha
258: <!-- PAINEL DO MOTORISTA -->
259: #secDriverPanel
261: <!-- Card do Veículo Vinculado -->
275: <!-- Renderizado via JS: Status "Em dia" ou "Em atraso" -->
285: <!-- Botão "Instalar app" (só aparece em celular Android, fora do próprio app) -->
290: <!-- Aviso: nova versão do app Android -->
293: <!-- Aviso vermelho: notificações desligadas -->
296: <!-- Aviso vermelho: CNH vencida (com botão para enviar a nova) -->
300: <!-- Aviso de Pix / pagamento pendente -->
303: <!-- Navegação de Abas -->
321: <!-- Conteúdo das Abas Motorista -->
324: <!-- Aba CRLV-e -->
325: #tabDrvCrlv
330: <!-- Renderizado dinamicamente -->
334: <!-- Aba Contrato -->
335: #tabDrvContract
345: <!-- Renderizado dinamicamente -->
349: <!-- Aba Vistoria -->
350: #tabDrvInspection
357: <!-- Aba Pagamento -->
358: #tabDrvPayment
371: <!-- Caução e multas do motorista -->
373: <!-- Valor e descrição da cobrança -->
383: <!-- Seção Pix -->
396: <!-- QR Code Renderizado aqui -->
421: <!-- Seção Upload de Comprovante -->
438: <!-- Lista de comprovantes -->
448: <!-- PAINEL MASTER (ADMINISTRAÇÃO) -->
449: #secMasterPanel
483: <!-- Aviso: falta criar a tabela dos termos no banco -->
486: <!-- SUB-ABA: GESTÃO DE VEÍCULOS -->
488: <!-- Lista de Veículos -->
504: <!-- Renderizado via JS -->
511: <!-- Form de Adicionar Veículo -->
545: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
551: <!-- Lista de Motoristas (sem moldura: os cartões já são a moldura) -->
556: <!-- Cartões dos motoristas: renderizados em renderMasterPanel (cartão curto + "Mais ações") -->
561: <!-- Form de Adicionar Motorista -->
656: <!-- Barra de baixo do dono (só no design novo) -->
666: <!-- MODAL PRIMEIRO LOGIN -->
667: #modalFirstLogin
701: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
702: #modalNotif
715: <!-- MODAL VISTORIA (MASTER) -->
716: #modalInspection
729: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
730: #modalSettings
789: <!-- MODAL TEMAS -->
790: #modalThemes
801: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
802: #modalCreds
817: <!-- JANELA DE CONFIRMAÇÃO DO APP (substitui confirm/prompt do navegador; ver uiDialogo) -->
832: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
833: #modalDriverFile
897: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
912: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
954: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
955: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
956: #modalRecibo
975: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
976: #modalPixArea
992: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
993: #modalIA
1075: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1076: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1077: #modalEditVeh
1096: #modalSenha
1118: #modalMeusRecibos
1136: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1137: #modalEmail
1157: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1158: #modalReport
1173: #modalFinance
1226: <!-- FILTROS -->
1275: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1295: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1296: #modalExpenses
1331: <!-- MODAL NOVO PIX -->
1332: #modalNewPix
1384: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1442: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1443: #modalCorrigirRecibo
1457: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
1458: #modalDocViewer
1466: #modalDocBody
1467: <!-- Conteúdo pré-visualizado -->
1473: #modalTerms
1487: <!-- NOTIFICAÇÕES TOAST -->
1504: lsGet()
1505: lsSet()
1506: lsDel()
1529: demoLoginRole()
1533: demoId()
1534: demoSave()
1535: demoSaved()
1537: *datas no horário de Brasília*
1538: demoLocal()
1539: demoParts()
1540: demoDay()
1541: demoNextDue()
1546: *dados fictícios (4 meses)*
1547: demoBuild()
1690: *documentos fictícios (imagem gerada na hora)*
1691: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
1692: demoDocBlob()
1770: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
1771: demoQuery()
1794: out()
1800: run()
1841: demoOnUpdate()
1851: demoOnInsert()
1918: demoClient()
1983: demoStart()
1991: demoStop()
1997: abrirDemo()
2004: trocarDemo()
2009: demoBanner()
2024: toEmail()
2028: showLogin()
2032: esc()
2037: dataHoraBR()
2045: uiDialogo()
2089: uiConfirm()
2098: uiPrompt()
2104: friendlyError()
2114: devicePrefs()
2117: saveDevicePrefs()
2120: docRef()
2121: viewDocIdx()
2123: setBusy()
2161: **TEMAS**
2170: currentTheme()
2175: applyTheme()
2176: openThemes()
2186: pickTheme()
2192: toggleDarkMode()
2194: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
2196: loadDesignCfg()
2203: applyDesign()
2220: markMasterNav()
2225: fillDesignCfg()
2230: saveDesign()
2244: showToast()
2253: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
2254: senhaErro()
2255: abrirSenha()
2264: salvarIaCodigo()
2274: fecharSenha()
2275: salvarSenha()
2296: loginUserInput()
2301: loginErro()
2305: verSenha()
2310: handleLogin()
2359: logout()
2378: saveFirstLoginPreferences()
2400: loadAndRender()
2454: autoRefresh()
2493: markUpdated()
2498: reload()
2503: renderApp()
2551: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
2554: masterBack()
2556: viewAsDriver()
2578: exitViewAs()
2597: viewOnly()
2598: renderViewAsBanner()
2608: showSection()
2614: toggleDriverStatus()
2623: isOnline()
2625: updateStatusToggleUI()
2638: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
2647: checkApkUpdate()
2662: updateInstallApkButton()
2682: renderDriverPanel()
2855: switchDriverTab()
2870: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
2873: parsePixKey()
2877: normalizePixKey()
2885: pixKeyLooksOk()
2893: togglePixKeyFields()
2899: updatePixKeyPlaceholder()
2905: copyPixKey()
2912: copyPixCode()
2924: receiptBadge()
2934: receiptMasterBox()
2961: receiptAction()
2968: confirmReceipt()
2981: rejectReceipt()
2993: recheckReceipt()
3002: uploadReceipt()
3025: switchMasterTab()
3042: maskPhone()
3051: waLink()
3056: allVeh()
3057: renderMasterPanel()
3186: handleAddVehicle()
3219: deleteVehicle()
3220: cancelDeleteVehicle()
3222: confirmDeleteVehicle()
3240: abrirEditarVeiculo()
3259: fecharEditarVeiculo()
3260: salvarEditarVeiculo()
3290: drvCauMostra()
3297: drvCauLer()
3304: handleAddDriver()
3382: marcarSituacao()
3390: updateDriverPaymentStatus()
3399: deleteDriver()
3400: cancelDeleteDriver()
3402: confirmDeleteDriver()
3419: prepareFile()
3441: uploadFile()
3452: fileUrl()
3463: downloadName()
3467: renderFilePreview()
3487: renderPdfToCanvas()
3514: viewDoc()
3535: **DINHEIRO**
3536: parseMoney()
3543: fmtMoney()
3544: fmtDate()
3545: todayISO()
3547: **CONFIGURAÇÕES (Gemini e Google Drive)**
3549: loadConfigStatus()
3554: paintConfig()
3559: openSettings()
3569: closeSettings()
3570: saveConfig()
3580: **ASAAS (Financeiro) — chaves ficam em app_secrets; master_asaas_info mostra o que já existe**
3581: loadAsaasInfo()
3594: saveAsaas()
3602: testarAsaas()
3609: copiarAsaas()
3613: testDrive()
3620: resyncDrive()
3628: **FICHA DO MOTORISTA**
3631: openDriverFile()
3660: closeDriverFile()
3662: saveDriverFile()
3710: aiFillDriver()
3749: **CONTROLE FINANCEIRO**
3750: finRange()
3767: dayBR()
3768: inRange()
3770: onFinPeriodChange()
3776: fillFinFilters()
3783: clearFinFilters()
3787: updateFinFilterCount()
3796: openFinance()
3801: switchFinTab()
3811: closeFinance()
3813: renderFinance()
3878: renderFinGrafico()
3898: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
3900: okEmail()
3902: openEmailCompose()
3923: closeEmailCompose()
3924: sendEmailCompose()
3939: emailRecibo()
3944: emailIA()
3952: **RELATÓRIO DO FINANCEIRO**
3954: finFiltersText()
3959: finPeriodText()
3966: buildReportHtml()
3988: openFinReport()
3998: closeFinReport()
3999: printFinReport()
4003: shareFinReport()
4013: emailFinReport()
4019: **DESPESAS DO VEÍCULO**
4021: openExpenses()
4033: closeExpenses()
4034: fillExpenseTypes()
4039: createExpenseType()
4054: aiReadExpense()
4086: renderExpenses()
4108: saveExpense()
4135: deleteExpense()
4156: photoCard()
4185: inspectionHtml()
4211: hydrateImages()
4217: openInspection()
4225: closeInspection()
4229: renderInspectionModal()
4236: uploadInspection()
4267: deleteInspectionPhoto()
4283: fmtDue()
4289: nextDueLocal()
4300: openNewPix()
4329: **CAUÇÃO DO MOTORISTA**
4330: cauOf()
4331: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
4332: devOf()
4333: devCobrancas()
4335: devPrevisao()
4343: dfDevRender()
4370: dfDevIr()
4371: dfDevSalvar()
4376: dfDevAvisar()
4382: dfDevDesfazer()
4386: dfDevReceber()
4395: cauNext()
4402: dfCauFill()
4412: dfCauCalc()
4429: dfCauRead()
4442: **CAUÇÃO: quanto já foi pago**
4444: cauStatus()
4454: obsResumoHtml()
4455: cauResumoHtml()
4460: **MULTAS E OUTRAS DESPESAS**
4461: multasOf()
4463: multaPagaAuto()
4468: multasAbertas()
4469: multasPendentes()
4470: multasResumoHtml()
4478: cobOf()
4479: dfCobFill()
4485: dfCobRead()
4488: dfCobInfo()
4498: cobResumoHtml()
4502: ajustesOf()
4504: previsaoProxima()
4517: previsaoHtml()
4521: dfAjRender()
4527: addAjuste()
4533: delAjuste()
4536: abrirAjustes()
4537: renderProxCobrancas()
4543: savePixExtra()
4551: dfMultFill()
4559: fdPaga()
4560: dfMultRender()
4569: toggleMultas()
4576: addMulta()
4584: delMulta()
4589: multaPaga()
4595: renderDriverExtras()
4622: mondayAfter()
4630: renderDriverProfileExtras()
4678: semanaDoPix()
4684: **MEUS RECIBOS (área do motorista)**
4686: meusRecibosLista()
4690: openMeusRecibos()
4704: closeMeusRecibos()
4705: reciboPdfHtml()
4716: verMeuRecibo()
4723: voltarMeusRecibos()
4724: pdfMeuRecibo()
4728: shareMeuRecibo()
4735: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
4736: editVehicleRent()
4748: nextParcel()
4754: fillNewPixValues()
4790: newPixParts()
4821: **PERÍODO E VENCIMENTO DA COBRANÇA**
4822: dataISO()
4823: dataDe()
4824: dataMais()
4825: dataBR()
4826: diasEntre()
4827: isoSP()
4828: pixPeriodo()
4835: pixDesc()
4836: pixDiasPeriodo()
4840: pixDatasNovo()
4849: pixDatasMudou()
4860: pixAluguelProporcional()
4868: pixPeriodoInfo()
4881: pixAddLinha()
4888: pixLinhas()
4890: descSoma()
4900: calcNewPix()
4909: **RECIBO DE PAGAMENTO**
4913: receiptValue()
4914: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
4915: atrasoDados()
4922: cobrarAtraso()
4938: allocatePix()
4957: reciboData()
4980: fmtDateTimeBR()
4981: reciboTexto()
5032: openRecibo()
5049: closeRecibo()
5050: **CORRIGIR RECIBO**
5052: corrigirLinhaHtml()
5062: openCorrigirRecibo()
5085: closeCorrigirRecibo()
5086: corrigirLer()
5092: corrigirSoma()
5099: salvarCorrigirRecibo()
5116: copyRecibo()
5121: reciboCanvas()
5138: reciboPdfBlob()
5156: shareReciboPdf()
5170: rotularTabelas()
5190: areaAberta()
5191: markAreas()
5194: closeAreas()
5198: toggleArea()
5208: dobraSalva()
5209: setDobra()
5214: toggleDobra()
5221: dobraTopo()
5228: renderMasterResumo()
5242: renderMasterTopo()
5264: loadIA()
5286: updateIABadge()
5291: loadIASetting()
5297: paintIASwitch()
5303: toggleIA()
5310: loadRobo()
5319: iaPrepararQr()
5324: paintRobo()
5353: pedirCodigoRobo()
5362: toggleRobo()
5374: iaTodosGerar()
5392: iaTodosCancelar()
5396: iaTodosConfirmar()
5410: loadIARules()
5415: iaAbrirPdf()
5421: renderIARules()
5425: saveIARules()
5430: addIARule()
5435: delIARule()
5439: openIA()
5452: closeIA()
5453: iaShow()
5454: iaPhone()
5459: renderIA()
5501: iaAprovar()
5510: iaPhone2()
5511: iaSend()
5542: iaMark()
5551: iaDelete()
5560: openPixArea()
5569: closePixArea()
5570: renderPixArea()
5606: openEditPix()
5635: deletePix()
5647: closeNewPix()
5649: saveNewPix()
5740: pushSupported()
5741: isIOS()
5742: isStandalone()
5743: b64ToBytes()
5749: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
5754: notifStatus()
5762: stepsList()
5766: notifHelpHtml()
5800: renderNotifModal()
5812: checkDriverNotifications()
5843: activateFromModal()
5854: refreshNotifButton()
5873: subscribePush()
5888: enableNotifications()
5906: closeDocViewer()
5914: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
5926: allFeaturesOn()
5927: feat()
5928: loadDriverFeatures()
5935: saveDriverFeatures()
5939: drawFeatureToggles()
5954: setAllFeatures()
5959: applyDriverFeatures()
5973: **PIX: conferência do código e QR code desenhado no aparelho**
5974: crc16()
5982: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
5984: pixTxt()
5985: pixCampo()
5986: pixGerarCodigo()
5996: pixAutoLigado()
5997: pixAutoMudou()
6002: gerarPixAuto()
6018: pixRecebedorCarregar()
6029: pixRecebedorGuardar()
6036: pixValid()
6042: renderPixQr()
6052: previewNewPixQr()
6062: **FOTO DO MOTORISTA (recortada da CNH)**
6063: photoPath()
6064: fileToCanvas()
6083: cropPhoto()
6097: savePhoto()
6102: photoBoxFrom()
6108: fillAvatar()
6119: fillAvatars()
6132: storedFile()
6139: photoFromCnh()
6151: **FOTO DO PERFIL ACOMPANHA A CNH**
6154: cnhStamp()
6155: photoFiles()
6163: avatarPath()
6168: syncCnhPhotos()
6191: pickImage()
6194: changeDriverPhoto()
6210: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
6212: uploadTmp()
6219: clearTmp()
6224: aiReadFiles()
6230: okDateISO()
6232: noAccents()
6234: makeUsername()
6243: titleCase()
6244: syncNewDriverAccess()
6250: setNewDriverPhoto()
6255: pickNewDriverPhoto()
6259: resetNewDriverForm()
6267: newDriverDocChosen()
6301: anoCrlv()
6302: aiReadCrlv()
6319: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
6320: sendWelcomeEmail()
6326: showCredentials()
6337: demoAssistente()
6356: **PERGUNTAR À IA (ÁREA IA, só o master)**
6360: iaChatReset()
6361: iaNorm()
6362: iaAcha()
6368: iaVeicTxt()
6369: iaCamposVeic()
6370: iaDataOk()
6371: iaOpcoes()
6372: iaTodosMotoristas()
6376: iaFerramenta()
6465: renderIAChat()
6482: iaChatDica()
6483: iaChatEnviar()
6518: iaChatNota()
6519: iaCancelarCartao()
6520: iaConfirmarCartao()
6563: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
6564: renderAppEarnings()
6628: saveAppEarning()
6653: workDayISO()
6654: renderDayOff()
6665: setDayOff()
6675: aiReadEarning()
6708: **DESPESAS DO APLICATIVO**
6710: appExpCustomTypes()
6711: fillAppExpTypes()
6718: onAppExpTypeChange()
6723: saveAppExpense()
6747: deleteAppExpense()
6754: deleteAppEarning()
6849: loadTermsAcceptances()
6861: termsOf()
6862: currentAcceptance()
6863: needsTermsAcceptance()
6866: fmtDateTime()
6869: termsPlainText()
6873: termsHash()
6881: openTermsGate()
6904: termsGateCheck()
6912: acceptTerms()
6932: acceptanceHtml()
6943: openTermsViewer()
6961: closeTerms()
6967: downloadTermsCopy()
6988: termsBadgeMaster()
6995: termsMasterDetail()
7036: renderTermsSetupBanner()
7049: copyTermsSql()
7059: cnhExpired()
7060: cnhWaiting()
7061: onlyDigits()
7062: normName()
7064: verifyCnh()
7076: renderCnhBanner()
7094: sendNewCnh()
7142: cnhBadgeMaster()
7150: applyPendingCnh()
7158: autoReadNewCnhs()
7176: cnhPendingHtml()
7190: recheckPendingCnh()
7200: rejectPendingCnh()
7210: showContractDoc()

## sw.js (61 linhas)

(sem itens)

## robo-whatsapp/nucleo.js (784 linhas)

26: mascarar()
29: numeroBR()
35: empacotar()
45: credsValido()
50: abrirPacote()
64: abrirConteudo()
74: textoDe()
83: contatoOculto()
86: novoIdRobo()
87: ehDoRobo()
90: numeroDoJid()
92: soBrasil()
95: organizarPix()
102: criarRobo()
105: hora()
106: log()
116: pareado()
117: limparLocal()
119: motoraBruto()
130: motora()
136: avisarErroPareamento()
138: *conexão guardada no Supabase*
139: existeGuardada()
140: restaurar()
174: guardar()
202: agendarBackup()
208: *conexão com o WhatsApp*
209: agendarAbrir()
214: backoff()
219: falhaAoAbrir()
221: soltarSocket()
228: abrir()
259: *conversa que já existia (pedido do dono, 04/11/2026)*
263: aoHistorico()
271: conversaAntiga()
283: aoMudar()
312: esquecerConexao()
318: aoCair()
334: reabrirQr()
359: *conectar pelo número*
360: verificarPareamento()
401: *fila de envio*
403: mandar()
414: conteudoDe()
421: enviar()
438: enviarCopias()
460: marcarEnviada()
467: verReinicio()
478: sinalDeVida()
491: ciclo()
526: *mensagens recebidas (comprovante de motorista e resposta do dono)*
529: aoReceber()
536: telefoneDe()
545: avisarArquivoSemNumero()
552: comRepeticao()
560: responder()
565: tratarRecebida()
622: *atendimento de número desconhecido (saudação, aviso à Dara e conversa intermediada)*
624: destino()
632: encaminhar()
637: ouvirDono()
649: entregarAtendimento()
674: pessoaRespondeu()
687: chamarDara()
710: cicloAtendimento()
715: receberArquivo()
734: *página do QR*
735: pagina()
749: *laços*
750: repetir()
757: iniciar()
768: encerrar()

## robo-whatsapp/robo.js (28 linhas)

(sem itens)

## supabase/functions/motora-asaas/index.ts (302 linhas)

22: serviceKey()
29: json()
31: brl()
34: secret()
39: asaas()
52: avisar()
62: hojeBR()
63: proximoDia()
70: proximaParcela()
79: cobrarMotorista()
92: *valores (mesma regra do Novo Pix)*
118: *QR code Pix estático com o valor da semana (sem taxa até 100 Pix/mês)*
140: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
160: cobrarTodos()
179: *pagamento recebido*
180: quemPagou()
203: pagamentoRecebido()
243: ehMaster()
253: preparar()
254: limpa()
291: acao "preparar"
295: acao "cobrar"

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

## supabase/functions/motora-qr-asaas/index.ts (28 linhas)

5: serviceKey()
11: json()

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

## supabase/functions/motora-robo/index.ts (461 linhas)

15: serviceKey()
21: json()
24: secret()
29: ehDono()
34: motoristaDoFone()
43: nivelDaMensagem()
56: resumoDe()
67: respostaCliente()
80: aceita()
86: falaCliente()
92: avisoDara()
96: aceita()
110: acao "pendentes"
121: conta()
148: acao "freio"
158: acao "enviada"
164: acao "falhou"
176: *mensagens RECEBIDAS: só valem com o envio automático ligado*
179: *número desconhecido: saúda, em 3 min sem resposta chama a Dara e intermedia a conversa*
181: rotulo()
182: acao "atendimento"
305: acao "audio_dono"
310: acao "locadora_respondeu"
316: acao "atendimento_fila"
347: acao "atendimento_ok"
356: acao "atendimento_falhou"
361: acao "mensagem"
385: acao "comprovante_url"
404: acao "comprovante_salvar"
414: acao "comprovante_sem_numero"
419: acao "qr"
426: acao "parear_ver"
430: acao "parear_codigo"
437: acao "sessao_existe"
441: acao "sessao_enviar"
446: acao "sessao_baixar"
451: acao "sessao_apagar"

## SQL aplicado no Supabase (supabase/*.sql)

- supabase/2026-11-01-novidades.sql: MOTORA — novidades de 01/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-asaas-config.sql: MOTORA — 02/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-periodo-cobranca.sql: MOTORA — período, vencimento e correção de recibo por cobrança (02/11/2026)
- supabase/2026-11-03-atendimento.sql: Atendimento de número desconhecido pelo robô (só o robô usa, pela função motora-robo)
- supabase/2026-11-03-atraso.sql: MOTORA — 03/11/2026 (APLICADO)
- supabase/2026-11-03-checa-robo.sql: Checagem do robô a cada 30 s: avisa o dono uma vez quando para e outra quando volta
- supabase/2026-11-03-devolucao-aprovar.sql: Depois do botão de devolução, nenhuma mensagem sai para o motorista sem a aprovação do dono
- supabase/2026-11-03-dono-assistente.sql: Conversa do dono com a IA pelo WhatsApp e o pedido que espera o SIM. Só as funções do servidor leem e gravam.
- supabase/2026-11-03-ia-codigo.sql: Palavra secreta e chave do GitHub da IA do dono: só o master grava; ninguém lê pelo app. A palavra fica só como resumo (hash).
- supabase/2026-11-03-ia-ganhos-app.sql: A IA do WhatsApp (motora-dono) grava ganhos e despesas de aplicativo depois do SIM do dono
- supabase/2026-11-03-lembretes.sql: MOTORA — 03/11/2026 (APLICADO em 03/11/2026)
- supabase/2026-11-03-whatsapp-dono.sql: WhatsApp do dono: avisos do master no número dele e confirmação de comprovante por resposta.
- supabase/2026-11-04-ar-avisos-grafico.sql: Ar-condicionado: histórico do quarto (gráfico) e avisos no celular. Só mexe na área "ar".
- supabase/2026-11-04-ar-condicionado.sql: Ar-condicionado (Gree ESP32): área isolada "ar" no projeto motora. Não toca nas tabelas do MOTORA.
- supabase/2026-11-04-conversa-antiga.sql: Conversa que já existia (04/11/2026, já aplicado): número que não é motorista e já conversava com a locadora
- supabase/2026-11-04-pix-automatico.sql: Pix automático do MOTORA e lembrete do meio-dia (já aplicado em 04/11/2026)
- supabase/2026-11-10-qr-asaas-whatsapp.sql: Mensagem de Pix de motorista no Asaas leva a imagem do QR code criada pelo Asaas (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-remove-picpay.sql: PicPay retirado do MOTORA (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-seguranca.sql: Segurança (10/11/2026). Já aplicado no banco.
