# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 12/11/2026, 18:55:51. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (8586 linhas)

16: <!-- Tailwind CSS compilado (sem observador em tempo real para toque instantâneo) -->
18: <!-- Font Awesome Icons -->
20: <!-- PDF.js para renderizar PDFs -->
22: <!-- Gera o QR code do Pix a partir do copia e cola -->
24: <!-- Supabase (banco de dados online) -->
140: <!-- Sistema de design do MOTORA: cores, tipografia e componentes -->
145: <!-- Header Principal -->
159: <!-- Controles do Header -->
161: <!-- Botão Status Online/Offline (Motorista) -->
169: <!-- Ativar Notificações -->
174: <!-- Temas -->
179: <!-- Logout Button -->
188: <!-- Conteúdo Principal -->
191: <!-- TELA DE LOGIN -->
192: #secLogin
225: <!-- ESCOLHA DA DEMONSTRAÇÃO (login teste / teste) -->
226: #secDemoEscolha
241: <!-- PAINEL DO MOTORISTA -->
242: #secDriverPanel
244: <!-- Card do Veículo Vinculado -->
258: <!-- Renderizado via JS: Status "Em dia" ou "Em atraso" -->
268: <!-- Botão "Instalar app" (só aparece em celular Android, fora do próprio app) -->
273: <!-- Aviso: nova versão do app Android -->
276: <!-- Aviso vermelho: notificações desligadas -->
279: <!-- Aviso vermelho: CNH vencida (com botão para enviar a nova) -->
283: <!-- Aviso de Pix / pagamento pendente -->
286: <!-- Navegação de Abas -->
304: <!-- Conteúdo das Abas Motorista -->
307: <!-- Aba CRLV-e -->
308: #tabDrvCrlv
313: <!-- Renderizado dinamicamente -->
317: <!-- Aba Contrato -->
318: #tabDrvContract
328: <!-- Renderizado dinamicamente -->
332: <!-- Aba Vistoria -->
333: #tabDrvInspection
340: <!-- Aba Pagamento -->
341: #tabDrvPayment
354: <!-- Caução e multas do motorista -->
356: <!-- Valor e descrição da cobrança -->
366: <!-- Seção Pix -->
380: <!-- QR Code Renderizado aqui -->
413: <!-- Seção Upload de Comprovante -->
430: <!-- Lista de comprovantes -->
435: <!-- Recibos quando o contrato está encerrado -->
442: <!-- PAINEL MASTER (ADMINISTRAÇÃO) -->
443: #secMasterPanel
477: <!-- Aviso: falta criar a tabela dos termos no banco -->
480: <!-- SUB-ABA: GESTÃO DE VEÍCULOS -->
482: <!-- Lista de Veículos -->
498: <!-- Renderizado via JS -->
505: <!-- Form de Adicionar Veículo -->
539: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
545: <!-- Lista de Motoristas (sem moldura: os cartões já são a moldura) -->
550: <!-- Cartões dos motoristas: renderizados em renderMasterPanel (cartão curto + "Mais ações") -->
555: <!-- Fichas Arquivadas (após marcar caução pago) -->
564: <!-- Form de Adicionar Motorista -->
659: <!-- Barra de baixo do dono (só no design novo) -->
669: <!-- MODAL PRIMEIRO LOGIN -->
670: #modalFirstLogin
704: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
705: #modalNotif
718: <!-- MODAL VISTORIA (MASTER) -->
719: #modalInspection
732: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
733: #modalSettings
800: <!-- MODAL TEMAS -->
801: #modalThemes
812: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
813: #modalCreds
828: <!-- JANELA DE CONFIRMAÇÃO DO APP (substitui confirm/prompt do navegador; ver uiDialogo) -->
843: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
844: #modalDriverFile
884: <!-- ENCERRAMENTO DE CONTRATO (profiles.pix_extra.contrato_encerrado) -->
913: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
928: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
970: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
971: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
972: #modalRecibo
991: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
992: #modalPixArea
1008: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
1009: #modalIA
1091: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1092: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1093: #modalEditVeh
1112: #modalSenha
1134: #modalMeusRecibos
1152: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1153: #modalEmail
1173: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1174: #modalReport
1189: #modalFinCardDetail
1202: #modalFinance
1256: <!-- FILTROS -->
1306: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1326: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1327: #modalExpenses
1362: <!-- MODAL NOVO PIX -->
1363: #modalNewPix
1415: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1473: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1474: #modalCorrigirRecibo
1488: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
1489: #modalDocViewer
1497: #modalDocBody
1498: <!-- Conteúdo pré-visualizado -->
1504: #modalTerms
1518: <!-- NOTIFICAÇÕES TOAST -->
1535: lsGet()
1536: lsSet()
1537: lsDel()
1560: demoLoginRole()
1564: demoId()
1565: demoSave()
1566: demoSaved()
1568: *datas no horário de Brasília*
1569: demoLocal()
1570: demoParts()
1571: demoDay()
1572: demoNextDue()
1577: *dados fictícios (4 meses)*
1578: demoBuild()
1721: *documentos fictícios (imagem gerada na hora)*
1722: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
1723: demoDocBlob()
1801: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
1802: demoQuery()
1825: out()
1831: run()
1872: demoOnUpdate()
1882: demoOnInsert()
1983: demoClient()
2048: demoStart()
2056: demoStop()
2062: abrirDemo()
2069: trocarDemo()
2074: demoBanner()
2089: toEmail()
2093: showLogin()
2097: esc()
2102: dataHoraBR()
2110: uiDialogo()
2158: uiConfirm()
2167: uiPrompt()
2173: friendlyError()
2183: devicePrefs()
2186: saveDevicePrefs()
2189: docRef()
2190: viewDocIdx()
2192: setBusy()
2230: **TEMAS**
2239: currentTheme()
2244: applyTheme()
2245: openThemes()
2255: pickTheme()
2261: toggleDarkMode()
2263: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
2265: loadDesignCfg()
2272: applyDesign()
2289: markMasterNav()
2294: fillDesignCfg()
2299: saveDesign()
2313: showToast()
2322: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
2323: senhaErro()
2324: abrirSenha()
2333: salvarIaCodigo()
2343: fecharSenha()
2344: salvarSenha()
2365: loginUserInput()
2370: loginErro()
2374: verSenha()
2379: handleLogin()
2428: logout()
2447: saveFirstLoginPreferences()
2470: carregarDados()
2493: aplicarDados()
2516: loadAndRender()
2543: autoRefresh()
2582: markUpdated()
2587: reload()
2592: renderApp()
2640: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
2643: masterBack()
2645: viewAsDriver()
2667: exitViewAs()
2686: viewOnly()
2687: renderViewAsBanner()
2697: showSection()
2702: withBtn()
2710: toggleDriverStatus()
2719: isOnline()
2721: updateStatusToggleUI()
2734: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
2743: checkApkUpdate()
2758: updateInstallApkButton()
2778: renderDriverPanel()
3003: switchDriverTab()
3018: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
3021: parsePixKey()
3025: normalizePixKey()
3033: pixKeyLooksOk()
3041: togglePixKeyFields()
3047: updatePixKeyPlaceholder()
3053: copyPixKey()
3060: copyPixCode()
3072: receiptBadge()
3082: receiptMasterBox()
3109: receiptAction()
3116: confirmReceipt()
3129: rejectReceipt()
3141: recheckReceipt()
3150: uploadReceipt()
3173: switchMasterTab()
3190: maskPhone()
3199: waLink()
3204: allVeh()
3205: allDrv()
3206: chargeVehicleId()
3218: enviarPedidoParcialAsaas()
3234: pedirPixParcial()
3252: restaurarPixTotal()
3258: responderPixParcial()
3282: contrato30Info()
3312: encerrarContrato()
3329: encerrarContratoPrompt()
3342: reativarContrato()
3366: marcarCaucaoPagoArquivar()
3387: desarquivarFicha()
3405: deliveryInspectionHtml()
3435: uploadDeliveryPhotos()
3462: delDeliveryPhoto()
3480: addCauDesconto()
3505: puxarMultaCaucao()
3526: delCauDesconto()
3548: dfCauDescontosHtml()
3581: dfContratoRender()
3625: encerrarContratoConfirmFicha()
3632: renderMasterPanel()
3783: renderArchivedDrivers()
3828: handleAddVehicle()
3861: deleteVehicle()
3862: cancelDeleteVehicle()
3864: confirmDeleteVehicle()
3888: abrirEditarVeiculo()
3907: fecharEditarVeiculo()
3908: salvarEditarVeiculo()
3938: drvCauMostra()
3945: drvCauLer()
3953: handleAddDriver()
4031: marcarSituacao()
4041: updateDriverPaymentStatus()
4050: deleteDriver()
4051: cancelDeleteDriver()
4053: confirmDeleteDriver()
4076: prepareFile()
4098: uploadFile()
4109: fileUrl()
4120: downloadName()
4124: renderFilePreview()
4144: renderPdfToCanvas()
4171: viewDoc()
4192: **DINHEIRO**
4193: parseMoney()
4200: fmtMoney()
4201: fmtDate()
4202: todayISO()
4204: **CONFIGURAÇÕES (Gemini e Google Drive)**
4206: loadConfigStatus()
4211: paintConfig()
4216: fillOwnerVehicleSelect()
4222: saveOwnerVehicle()
4244: openSettings()
4257: closeSettings()
4258: saveConfig()
4268: **ASAAS (Financeiro) — chaves ficam em app_secrets; master_asaas_info mostra o que já existe**
4269: loadAsaasInfo()
4282: saveAsaas()
4290: testarAsaas()
4297: copiarAsaas()
4301: testDrive()
4308: resyncDrive()
4316: **FICHA DO MOTORISTA**
4319: openDriverFile()
4349: closeDriverFile()
4351: saveDriverFile()
4407: aiFillDriver()
4446: **CONTROLE FINANCEIRO**
4447: finRange()
4464: dayBR()
4465: inRange()
4467: onFinPeriodChange()
4473: fillFinFilters()
4481: clearFinFilters()
4485: updateFinFilterCount()
4494: openFinance()
4499: switchFinTab()
4510: finCardBtn()
4518: closeFinCardDetail()
4519: closeFinance()
4521: collectRentFinData()
4572: renderFinance()
4630: openFinCardDetail()
4837: openFinExtrato()
4931: renderFinExtratoView()
5012: openFinExtratoReport()
5029: renderFinGrafico()
5049: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
5051: okEmail()
5053: openEmailCompose()
5074: closeEmailCompose()
5075: sendEmailCompose()
5090: emailRecibo()
5095: emailIA()
5103: **RELATÓRIO DO FINANCEIRO**
5105: finFiltersText()
5110: finPeriodText()
5117: buildReportHtml()
5139: openFinReport()
5149: closeFinReport()
5150: printFinReport()
5154: shareFinReport()
5164: emailFinReport()
5170: **DESPESAS DO VEÍCULO**
5172: openExpenses()
5184: closeExpenses()
5185: fillExpenseTypes()
5190: createExpenseType()
5205: aiReadExpense()
5237: renderExpenses()
5259: saveExpense()
5286: deleteExpense()
5311: photoCard()
5340: inspectionHtml()
5366: hydrateImages()
5372: openInspection()
5380: closeInspection()
5384: renderInspectionModal()
5391: uploadInspection()
5422: deleteInspectionPhoto()
5442: fmtDue()
5448: nextDueLocal()
5459: openNewPix()
5489: **CAUÇÃO DO MOTORISTA**
5490: cauOf()
5491: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
5492: devOf()
5493: devCobrancas()
5495: devPrevisao()
5503: dfDevRender()
5530: dfDevIr()
5531: dfDevSalvar()
5536: dfDevAvisar()
5542: dfDevDesfazer()
5546: dfDevReceber()
5555: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
5559: cauPlano()
5567: cauParcela()
5574: cauParcelasTexto()
5578: cauNext()
5585: dfCauFill()
5595: dfCauCalc()
5623: dfCauRead()
5636: expTypeName()
5640: driverFinVehicleId()
5652: cauEntradaItem()
5666: cauPagoDespesaItem()
5681: **CAUÇÃO: quanto já foi pago**
5683: cauStatus()
5693: obsResumoHtml()
5694: cauResumoHtml()
5699: **MULTAS E OUTRAS DESPESAS**
5700: multasOf()
5702: multaPagaAuto()
5707: multasAbertas()
5708: multasPendentes()
5709: multasResumoHtml()
5717: cobOf()
5718: dfCobFill()
5724: dfCobRead()
5727: dfCobInfo()
5737: cobResumoHtml()
5741: ajustesOf()
5745: ajusteVale()
5746: isoDia()
5748: vencProxima()
5749: previsaoProxima()
5763: previsaoHtml()
5767: dfAjRender()
5773: addAjuste()
5782: delAjuste()
5787: abrirAjustes()
5788: renderProxCobrancas()
5794: savePixExtra()
5802: dfMultFill()
5810: fdPaga()
5811: dfMultRender()
5820: toggleMultas()
5827: addMulta()
5837: delMulta()
5845: multaPaga()
5854: renderDriverExtras()
5882: mondayAfter()
5890: renderDriverProfileExtras()
5956: semanaDoPix()
5962: **MEUS RECIBOS (área do motorista)**
5964: meusRecibosLista()
5968: reciboRowHtml()
5976: renderEncerradoRecibos()
5981: openMeuReciboDireto()
5982: openMeusRecibos()
5989: closeMeusRecibos()
5990: reciboPdfHtml()
6001: verMeuRecibo()
6008: voltarMeusRecibos()
6009: pdfMeuRecibo()
6013: shareMeuRecibo()
6022: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
6023: editVehicleRent()
6040: nextParcel()
6046: fillNewPixValues()
6082: newPixParts()
6113: **PERÍODO E VENCIMENTO DA COBRANÇA**
6114: dataISO()
6115: dataDe()
6116: dataMais()
6117: dataBR()
6118: diasEntre()
6119: isoSP()
6120: pixPeriodo()
6127: pixDesc()
6128: pixDiasPeriodo()
6133: marcarAjustesPorVenc()
6138: pixDatasNovo()
6147: pixDatasMudou()
6158: pixAluguelProporcional()
6166: pixPeriodoInfo()
6179: pixAddLinha()
6186: pixLinhas()
6188: descSoma()
6198: calcNewPix()
6207: **RECIBO DE PAGAMENTO**
6211: receiptValue()
6212: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
6213: atrasoDados()
6220: cobrarAtraso()
6236: allocatePix()
6255: reciboData()
6278: fmtDateTimeBR()
6279: reciboTexto()
6330: openRecibo()
6347: closeRecibo()
6348: **CORRIGIR RECIBO**
6350: corrigirLinhaHtml()
6360: openCorrigirRecibo()
6383: closeCorrigirRecibo()
6384: corrigirLer()
6390: corrigirSoma()
6397: salvarCorrigirRecibo()
6414: copyRecibo()
6419: reciboCanvas()
6436: reciboPdfBlob()
6454: shareReciboPdf()
6470: rotularTabelas()
6488: areaAberta()
6489: markAreas()
6499: closeAreas()
6503: toggleArea()
6511: dobraSalva()
6512: setDobra()
6517: toggleDobra()
6524: dobraTopo()
6531: renderMasterResumo()
6545: renderMasterTopo()
6567: loadIA()
6589: updateIABadge()
6594: loadIASetting()
6600: paintIASwitch()
6606: toggleIA()
6613: loadRobo()
6622: iaPrepararQr()
6627: paintRobo()
6656: pedirCodigoRobo()
6665: toggleRobo()
6680: iaTodosGerar()
6698: iaTodosCancelar()
6702: iaTodosConfirmar()
6716: loadIARules()
6721: iaAbrirPdf()
6727: renderIARules()
6731: saveIARules()
6736: addIARule()
6741: delIARule()
6745: openIA()
6760: closeIA()
6761: iaShow()
6762: iaPhone()
6767: renderIA()
6809: iaAprovar()
6818: iaPhone2()
6819: iaSend()
6850: iaMark()
6861: iaDelete()
6872: openPixArea()
6881: closePixArea()
6882: renderPixArea()
6918: openEditPix()
6947: deletePix()
6959: closeNewPix()
6961: saveNewPix()
7052: pushSupported()
7053: isIOS()
7054: isStandalone()
7055: b64ToBytes()
7061: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
7066: notifStatus()
7074: stepsList()
7078: notifHelpHtml()
7112: renderNotifModal()
7124: checkDriverNotifications()
7157: activateFromModal()
7170: refreshNotifButton()
7189: subscribePush()
7204: enableNotifications()
7224: closeDocViewer()
7232: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
7244: allFeaturesOn()
7245: feat()
7246: loadDriverFeatures()
7253: saveDriverFeatures()
7257: drawFeatureToggles()
7272: setAllFeatures()
7283: applyDriverFeatures()
7298: **PIX: conferência do código e QR code desenhado no aparelho**
7299: crc16()
7307: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
7309: pixTxt()
7310: pixCampo()
7311: pixGerarCodigo()
7321: pixAutoLigado()
7322: pixAutoMudou()
7327: gerarPixAuto()
7343: pixRecebedorCarregar()
7354: pixRecebedorGuardar()
7361: pixValid()
7367: renderPixQr()
7377: previewNewPixQr()
7387: **FOTO DO MOTORISTA (recortada da CNH)**
7388: photoPath()
7389: fileToCanvas()
7408: cropPhoto()
7422: savePhoto()
7427: photoBoxFrom()
7433: fillAvatar()
7444: fillAvatars()
7457: storedFile()
7464: photoFromCnh()
7476: **FOTO DO PERFIL ACOMPANHA A CNH**
7479: cnhStamp()
7480: photoFiles()
7488: avatarPath()
7493: syncCnhPhotos()
7517: pickImage()
7520: changeDriverPhoto()
7536: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
7538: uploadTmp()
7545: clearTmp()
7550: aiReadFiles()
7556: okDateISO()
7558: noAccents()
7560: makeUsername()
7569: titleCase()
7570: syncNewDriverAccess()
7576: setNewDriverPhoto()
7581: pickNewDriverPhoto()
7585: resetNewDriverForm()
7593: newDriverDocChosen()
7627: anoCrlv()
7628: aiReadCrlv()
7645: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
7646: sendWelcomeEmail()
7652: showCredentials()
7663: demoAssistente()
7682: **PERGUNTAR À IA (ÁREA IA, só o master)**
7686: iaChatReset()
7687: iaNorm()
7688: iaAcha()
7694: iaVeicTxt()
7695: iaCamposVeic()
7696: iaDataOk()
7697: iaOpcoes()
7698: iaTodosMotoristas()
7702: iaFerramenta()
7797: renderIAChat()
7814: iaChatDica()
7815: iaChatEnviar()
7850: iaChatNota()
7851: iaCancelarCartao()
7852: iaConfirmarCartao()
7895: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
7896: renderAppEarnings()
7976: saveAppEarning()
8002: workDayISO()
8003: paintDayOff()
8012: renderDayOff()
8019: setDayOff()
8029: aiReadEarning()
8062: **DESPESAS DO APLICATIVO**
8064: appExpCustomTypes()
8065: fillAppExpTypes()
8072: onAppExpTypeChange()
8077: saveAppExpense()
8101: deleteAppExpense()
8110: deleteAppEarning()
8207: loadTermsAcceptances()
8219: termsOf()
8220: currentAcceptance()
8221: needsTermsAcceptance()
8224: fmtDateTime()
8227: termsPlainText()
8231: termsHash()
8239: openTermsGate()
8262: termsGateCheck()
8270: acceptTerms()
8290: acceptanceHtml()
8301: openTermsViewer()
8319: closeTerms()
8325: downloadTermsCopy()
8346: termsBadgeMaster()
8353: termsMasterDetail()
8394: renderTermsSetupBanner()
8407: copyTermsSql()
8417: cnhExpired()
8418: cnhWaiting()
8419: onlyDigits()
8420: normName()
8422: verifyCnh()
8434: renderCnhBanner()
8452: sendNewCnh()
8500: cnhBadgeMaster()
8508: applyPendingCnh()
8516: autoReadNewCnhs()
8534: cnhPendingHtml()
8548: recheckPendingCnh()
8558: rejectPendingCnh()
8568: showContractDoc()

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

## supabase/functions/motora-asaas/index.ts (518 linhas)

22: serviceKey()
29: json()
31: brl()
34: secret()
39: asaas()
52: avisar()
62: hojeBR()
63: proximoDia()
70: proximaParcela()
81: cauParcela()
90: ajusteVale()
93: tirarAjustes()
99: cobrarMotorista()
112: *valores (mesma regra do Novo Pix)*
140: *QR code Pix estático com o valor da semana (sem taxa até 100 Pix/mês)*
143: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
164: r2()
166: criarQrAsaasEUpload()
189: saldoAbertoMotorista()
228: salvarQrParcialNoPerfil()
239: cobrarTodos()
259: *pagamento recebido*
260: quemPagou()
283: pagamentoRecebido()
349: usuarioAuth()
358: ehMaster()
363: pixParcialMotorista()
422: autorizarParcial()
463: preparar()
464: limpa()
499: acao "pix_parcial"
502: acao "autorizar_parcial"
507: acao "preparar"
511: acao "cobrar"

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

## supabase/functions/motora-lembretes/index.ts (310 linhas)

15: serviceKey()
21: json()
22: brl()
28: cauParcela()
37: ajusteVale()
40: tirarAjustes()
46: secret()
51: hojeBR()
52: diaBR()
53: proximoDia()
60: previsao()
74: formaAuto()
76: avisoDono()
101: avisoMotorista()
122: emAberto()
134: avisoAtraso()
152: **4) PIX AUTOMÁTICO DO MOTORA**
154: crc16()
159: campo()
160: txtPix()
161: codigoPix()
168: chaveNormal()
175: proximaParcela()
183: pixAutomatico()
190: *valores (mesma regra do Novo Pix e do Asaas)*
217: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
238: pixAutoTodos()
262: enviar()
271: lembrar()

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

## supabase/functions/motora-push/index.ts (442 linhas)

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
300: sendToDriver()
313: type "public_key"
322: type "sunday"
330: type "recibo_teste"
334: type "master_alert"
338: type "driver_alert"
350: type "test"
358: type "aprovar_msg"
369: type "todos_rascunho"
377: type "todos_enviar"
387: type "new_pix"
399: type "boas_vindas"
414: type "cobranca"

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
- supabase/2026-11-12-caucao-valor-contrato.sql: Inclui o valor pago de caução no encerramento de contrato e na mensagem ao motorista
- supabase/2026-11-12-contrato-caucao-arquivo.sql: Contagem de 30 dias da caução após encerramento do contrato + "Caução pago" e arquivamento da ficha
- supabase/2026-11-12-contrato-parcial-financeiro.sql: MOTORA: vincula histórico de Pix ao veículo, adiciona encerramento de contrato e atualização segura de QR parcial (Asaas)
