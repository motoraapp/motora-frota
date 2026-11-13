# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 13/11/2026, 08:41:27. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (13396 linhas)

16: <!-- Tailwind CSS compilado (sem observador em tempo real para toque instantâneo) -->
18: <!-- Font Awesome Icons -->
20: <!-- PDF.js para renderizar PDFs -->
22: <!-- pdf-lib para gerar contratos em A4 profissional -->
24: <!-- Gera o QR code do Pix a partir do copia e cola -->
26: <!-- Supabase (banco de dados online) -->
142: <!-- Sistema de design do MOTORA: cores, tipografia e componentes -->
147: <!-- Header Principal -->
161: <!-- Controles do Header -->
163: <!-- Botão Status Online/Offline (Motorista) -->
171: <!-- Ativar Notificações -->
176: <!-- Temas -->
181: <!-- Logout Button -->
190: <!-- Conteúdo Principal -->
193: <!-- TELA DE LOGIN -->
194: #secLogin
227: <!-- ESCOLHA DA DEMONSTRAÇÃO (login teste / teste) -->
228: #secDemoEscolha
243: <!-- TELA PÚBLICA DE ASSINATURA OFICIAL VIA GOV.BR (?assinar=token) -->
244: #secGovBrInvite
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
397: <!-- QR Code Renderizado aqui -->
430: <!-- Seção Upload de Comprovante -->
447: <!-- Lista de comprovantes -->
452: <!-- Recibos quando o contrato está encerrado -->
459: <!-- PAINEL MASTER (ADMINISTRAÇÃO) -->
460: #secMasterPanel
500: <!-- Aviso: falta criar a tabela dos termos no banco -->
503: <!-- SUB-ABA: GESTÃO DE VEÍCULOS -->
505: <!-- Lista de Veículos -->
521: <!-- Renderizado via JS -->
528: <!-- Form de Adicionar Veículo -->
575: <!-- SUB-ABA: CONTRATOS DE LOCAÇÃO E VISTORIAS -->
675: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
681: <!-- Lista de Motoristas (sem moldura: os cartões já são a moldura) -->
686: <!-- Cartões dos motoristas: renderizados em renderMasterPanel (cartão curto + "Mais ações") -->
691: <!-- Fichas Arquivadas (após marcar caução pago) -->
700: <!-- Form de Adicionar Motorista -->
795: <!-- Barra de baixo do dono (só no design novo) -->
806: <!-- MODAL PRIMEIRO LOGIN -->
807: #modalFirstLogin
841: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
842: #modalNotif
855: <!-- MODAL VISTORIA (MASTER) -->
856: #modalInspection
869: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
870: #modalSettings
1003: <!-- MODAL TEMAS -->
1004: #modalThemes
1015: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
1016: #modalCreds
1031: <!-- JANELA DE CONFIRMAÇÃO DO APP (substitui confirm/prompt do navegador; ver uiDialogo) -->
1046: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
1047: #modalDriverFile
1089: <!-- CONTRATO DE LOCAÇÃO (rental_contracts + ações) -->
1093: <!-- ENCERRAMENTO DE CONTRATO (profiles.pix_extra.contrato_encerrado) -->
1122: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
1137: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
1179: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
1180: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
1181: #modalRecibo
1200: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
1201: #modalPixArea
1217: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
1218: #modalIA
1300: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1301: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1302: #modalEditVeh
1339: #modalSenha
1361: #modalMeusRecibos
1379: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1380: #modalEmail
1400: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1401: #modalReport
1416: #modalFinCardDetail
1429: #modalFinance
1462: <!-- FILTROS -->
1512: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1532: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1533: #modalExpenses
1568: <!-- MODAL NOVO PIX -->
1569: #modalNewPix
1621: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1679: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1680: #modalCorrigirRecibo
1694: <!-- MODAL WIZARD DE CONTRATO DE LOCAÇÃO -->
1695: #modalContractWizard
1711: <!-- Seleção Motorista & Veículo -->
1723: <!-- Locador -->
1744: <!-- Locatário -->
1765: <!-- Veículo -->
1788: <!-- Configuração Comercial -->
1865: <!-- Anexo I: Termo de Vistoria e Entrega Integrado -->
1933: <!-- Cláusulas editáveis -->
1945: <!-- Prévia -->
1959: <!-- MODAL DETALHE, ASSINATURAS E HISTÓRICO DO CONTRATO -->
1960: #modalContractDetail
1973: <!-- MODAL GERADOR DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO) -->
1974: #modalInspectionTerm
2035: <!-- Fotos da vistoria (lote + reuso + análise IA + confirmação obrigatória de avarias) -->
2058: <!-- Resumo de Avarias Confirmadas + Checklist Bilateral + Ressalvas -->
2098: <!-- MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA -->
2099: #modalInspectionTermDetail
2112: <!-- MODAL CONFIRMAÇÃO DE DANO DETECTADO PELA IA (OBRIGATÓRIO ANTES DE NOMEAR) -->
2113: #modalInspDamageConfirm
2128: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
2129: #modalDocViewer
2137: #modalDocBody
2138: <!-- Conteúdo pré-visualizado -->
2144: #modalTerms
2158: <!-- NOTIFICAÇÕES TOAST -->
2175: lsGet()
2176: lsSet()
2177: lsDel()
2200: demoLoginRole()
2204: demoId()
2205: demoSave()
2206: demoSaved()
2208: *datas no horário de Brasília*
2209: demoLocal()
2210: demoParts()
2211: demoDay()
2212: demoNextDue()
2217: *dados fictícios (4 meses)*
2218: demoBuild()
2451: *documentos fictícios (imagem gerada na hora)*
2452: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
2453: demoDocBlob()
2531: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
2532: demoQuery()
2555: out()
2561: run()
2602: demoOnUpdate()
2612: demoOnInsert()
2724: demoClient()
2914: demoStart()
2922: demoStop()
2928: abrirDemo()
2935: trocarDemo()
2940: demoBanner()
2955: toEmail()
2959: showLogin()
2963: esc()
2968: dataHoraBR()
2976: uiDialogo()
3024: uiConfirm()
3033: uiPrompt()
3039: friendlyError()
3049: devicePrefs()
3052: saveDevicePrefs()
3055: docRef()
3056: viewDocIdx()
3058: setBusy()
3101: **TEMAS**
3110: currentTheme()
3115: applyTheme()
3116: openThemes()
3126: pickTheme()
3132: toggleDarkMode()
3134: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
3136: loadDesignCfg()
3143: applyDesign()
3160: markMasterNav()
3167: fillDesignCfg()
3172: saveDesign()
3186: showToast()
3195: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
3196: senhaErro()
3197: abrirSenha()
3206: salvarIaCodigo()
3216: fecharSenha()
3217: salvarSenha()
3238: loginUserInput()
3243: loginErro()
3247: verSenha()
3252: handleLogin()
3301: logout()
3320: saveFirstLoginPreferences()
3343: carregarDados()
3375: aplicarDados()
3416: loadAndRender()
3443: autoRefresh()
3482: markUpdated()
3487: reload()
3492: renderApp()
3540: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
3543: masterBack()
3545: viewAsDriver()
3567: exitViewAs()
3586: viewOnly()
3587: renderViewAsBanner()
3597: showSection()
3602: withBtn()
3610: toggleDriverStatus()
3619: isOnline()
3621: updateStatusToggleUI()
3634: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
3643: checkApkUpdate()
3658: updateInstallApkButton()
3678: renderDriverPanel()
3936: switchDriverTab()
3951: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
3954: parsePixKey()
3958: normalizePixKey()
3966: pixKeyLooksOk()
3974: togglePixKeyFields()
3980: updatePixKeyPlaceholder()
3986: copyPixKey()
3993: copyPixCode()
4005: receiptBadge()
4015: receiptMasterBox()
4042: receiptAction()
4049: confirmReceipt()
4078: rejectReceipt()
4090: recheckReceipt()
4099: uploadReceipt()
4122: switchMasterTab()
4141: maskPhone()
4150: waLink()
4155: allVeh()
4156: allDrv()
4157: chargeVehicleId()
4169: enviarPedidoParcialAsaas()
4185: pedirPixParcial()
4203: restaurarPixTotal()
4209: responderPixParcial()
4233: contrato30Info()
4263: encerrarContrato()
4280: encerrarContratoPrompt()
4293: reativarContrato()
4317: marcarCaucaoPagoArquivar()
4338: desarquivarFicha()
4356: deliveryInspectionHtml()
4395: uploadDeliveryPhotos()
4422: delDeliveryPhoto()
4440: addCauDesconto()
4465: puxarMultaCaucao()
4486: delCauDesconto()
4508: dfCauDescontosHtml()
4541: dfContratoRender()
4585: encerrarContratoConfirmFicha()
4592: renderMasterPanel()
4756: renderArchivedDrivers()
4801: handleAddVehicle()
4841: deleteVehicle()
4842: cancelDeleteVehicle()
4844: confirmDeleteVehicle()
4868: abrirEditarVeiculo()
4890: evReadStoredCrlv()
4915: evReadChosenCrlv()
4931: fecharEditarVeiculo()
4932: salvarEditarVeiculo()
4969: drvCauMostra()
4976: drvCauLer()
4984: handleAddDriver()
5062: marcarSituacao()
5072: updateDriverPaymentStatus()
5081: deleteDriver()
5082: cancelDeleteDriver()
5084: confirmDeleteDriver()
5106: isImageFile()
5108: prepareFile()
5130: uploadFile()
5141: fileUrl()
5152: downloadName()
5156: renderFilePreview()
5176: renderPdfToCanvas()
5203: viewDoc()
5224: **DINHEIRO**
5225: parseMoney()
5232: fmtMoney()
5233: fmtDate()
5234: todayISO()
5236: **CONFIGURAÇÕES (Gemini e Google Drive)**
5238: loadConfigStatus()
5243: paintConfig()
5248: fillOwnerVehicleSelect()
5254: saveOwnerVehicle()
5276: locadorMerged()
5289: getLocadoresList()
5309: locadorForVehicle()
5318: fillLocadorSettings()
5338: cfgOnLocadorChange()
5339: upsertLocadorInList()
5369: deleteLocadorSetting()
5385: saveLocadorSettings()
5413: openSettings()
5428: closeSettings()
5429: saveConfig()
5439: **ASAAS (Financeiro: chave por motorista ativo + Config: conta API)**
5440: renderAsaasDrivers()
5467: toggleDriverAsaas()
5499: getAtrasoCfg()
5503: fillAtrasoCfg()
5510: saveAtrasoCfg()
5527: atrasoDataBR()
5532: atrasoPrazoUtil()
5539: calcEncargosAtraso()
5558: ehLinhaEncargo()
5559: calcAtrasoMotorista()
5589: atualizarPixAtraso()
5602: loadAsaasInfo()
5616: saveAsaas()
5624: testarAsaas()
5631: copiarAsaas()
5635: testDrive()
5642: resyncDrive()
5650: **FICHA DO MOTORISTA**
5653: openDriverFile()
5685: closeDriverFile()
5687: saveDriverFile()
5752: aiFillDriver()
5791: **CONTROLE FINANCEIRO**
5792: finRange()
5809: dayBR()
5810: inRange()
5812: onFinPeriodChange()
5818: fillFinFilters()
5826: clearFinFilters()
5830: updateFinFilterCount()
5839: openFinance()
5845: switchFinTab()
5856: finCardBtn()
5864: closeFinCardDetail()
5865: closeFinance()
5867: collectRentFinData()
5918: renderFinance()
5976: openFinCardDetail()
6183: openFinExtrato()
6277: renderFinExtratoView()
6358: openFinExtratoReport()
6375: renderFinGrafico()
6395: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
6397: okEmail()
6399: openEmailCompose()
6420: closeEmailCompose()
6421: sendEmailCompose()
6436: emailRecibo()
6441: emailIA()
6449: **RELATÓRIO DO FINANCEIRO**
6451: finFiltersText()
6456: finPeriodText()
6463: buildReportHtml()
6485: openFinReport()
6495: closeFinReport()
6496: printFinReport()
6500: shareFinReport()
6510: emailFinReport()
6516: **DESPESAS DO VEÍCULO**
6518: openExpenses()
6530: closeExpenses()
6531: fillExpenseTypes()
6536: createExpenseType()
6551: aiReadExpense()
6583: renderExpenses()
6605: saveExpense()
6632: deleteExpense()
6661: inspSlotLabel()
6664: normalizeInspDbSlot()
6667: photoDamageBadge()
6676: photoCard()
6714: inspectionHtml()
6761: hydrateImages()
6767: openInspection()
6775: closeInspection()
6779: renderInspectionModal()
6786: uploadInspection()
6843: deleteInspectionPhoto()
6863: fmtDue()
6869: nextDueLocal()
6880: openNewPix()
6910: **CAUÇÃO DO MOTORISTA**
6911: cauOf()
6912: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
6913: devOf()
6914: devCobrancas()
6916: devPrevisao()
6924: dfDevRender()
6951: dfDevIr()
6952: dfDevSalvar()
6957: dfDevAvisar()
6963: dfDevDesfazer()
6967: dfDevReceber()
6976: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
6980: cauPlano()
6988: cauParcela()
6995: cauParcelasTexto()
6999: cauNext()
7006: dfCauFill()
7016: dfCauCalc()
7044: dfCauRead()
7057: expTypeName()
7061: driverFinVehicleId()
7073: cauEntradaItem()
7087: cauPagoDespesaItem()
7102: **CAUÇÃO: quanto já foi pago**
7104: cauStatus()
7114: obsResumoHtml()
7115: cauResumoHtml()
7120: **MULTAS E OUTRAS DESPESAS**
7121: multasOf()
7123: multaPagaAuto()
7128: multasAbertas()
7129: multasPendentes()
7130: multasResumoHtml()
7138: cobOf()
7139: dfCobFill()
7145: dfCobRead()
7148: dfCobInfo()
7158: cobResumoHtml()
7162: ajustesOf()
7166: ajusteVale()
7167: isoDia()
7169: vencProxima()
7170: previsaoProxima()
7184: previsaoHtml()
7188: dfAjRender()
7194: addAjuste()
7203: delAjuste()
7208: abrirAjustes()
7209: renderProxCobrancas()
7215: savePixExtra()
7223: dfMultFill()
7231: fdPaga()
7232: dfMultRender()
7241: toggleMultas()
7248: addMulta()
7258: delMulta()
7266: multaPaga()
7275: renderDriverExtras()
7303: mondayAfter()
7311: renderDriverProfileExtras()
7377: semanaDoPix()
7383: **MEUS RECIBOS (área do motorista)**
7385: meusRecibosLista()
7389: reciboRowHtml()
7397: renderEncerradoRecibos()
7402: openMeuReciboDireto()
7403: openMeusRecibos()
7410: closeMeusRecibos()
7411: reciboPdfHtml()
7422: verMeuRecibo()
7429: voltarMeusRecibos()
7430: pdfMeuRecibo()
7434: shareMeuRecibo()
7443: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
7444: editVehicleRent()
7461: nextParcel()
7467: fillNewPixValues()
7503: newPixParts()
7534: **PERÍODO E VENCIMENTO DA COBRANÇA**
7535: dataISO()
7536: dataDe()
7537: dataMais()
7538: dataBR()
7539: diasEntre()
7540: isoSP()
7541: pixPeriodo()
7548: pixDesc()
7549: pixDiasPeriodo()
7554: marcarAjustesPorVenc()
7559: pixDatasNovo()
7568: pixDatasMudou()
7579: pixAluguelProporcional()
7587: pixPeriodoInfo()
7600: pixAddLinha()
7607: pixLinhas()
7609: descSoma()
7619: calcNewPix()
7628: **RECIBO DE PAGAMENTO**
7632: receiptValue()
7633: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
7634: atrasoDados()
7638: cobrarAtraso()
7655: allocatePix()
7674: reciboData()
7697: fmtDateTimeBR()
7698: reciboTexto()
7749: openRecibo()
7766: closeRecibo()
7767: **CORRIGIR RECIBO**
7769: corrigirLinhaHtml()
7779: openCorrigirRecibo()
7802: closeCorrigirRecibo()
7803: corrigirLer()
7809: corrigirSoma()
7816: salvarCorrigirRecibo()
7833: copyRecibo()
7838: reciboCanvas()
7855: reciboPdfBlob()
7873: shareReciboPdf()
7889: rotularTabelas()
7907: areaAberta()
7908: markAreas()
7918: closeAreas()
7922: toggleArea()
7930: dobraSalva()
7931: setDobra()
7936: toggleDobra()
7943: dobraTopo()
7950: renderMasterResumo()
7964: renderMasterTopo()
7986: loadIA()
8008: updateIABadge()
8013: loadIASetting()
8019: paintIASwitch()
8025: toggleIA()
8032: loadRobo()
8041: iaPrepararQr()
8046: paintRobo()
8075: pedirCodigoRobo()
8084: toggleRobo()
8099: iaTodosGerar()
8117: iaTodosCancelar()
8121: iaTodosConfirmar()
8135: loadIARules()
8140: iaAbrirPdf()
8146: renderIARules()
8150: saveIARules()
8155: addIARule()
8160: delIARule()
8164: openIA()
8179: closeIA()
8180: iaShow()
8181: iaPhone()
8186: renderIA()
8228: iaAprovar()
8237: iaPhone2()
8238: iaSend()
8269: iaMark()
8280: iaDelete()
8291: openPixArea()
8300: closePixArea()
8301: renderPixArea()
8345: openEditPix()
8374: deletePix()
8386: closeNewPix()
8388: saveNewPix()
8479: pushSupported()
8480: isIOS()
8481: isStandalone()
8482: b64ToBytes()
8488: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
8493: notifStatus()
8501: stepsList()
8505: notifHelpHtml()
8539: renderNotifModal()
8551: checkDriverNotifications()
8584: activateFromModal()
8597: refreshNotifButton()
8616: subscribePush()
8631: enableNotifications()
8651: closeDocViewer()
8659: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
8671: allFeaturesOn()
8672: feat()
8673: loadDriverFeatures()
8680: saveDriverFeatures()
8685: drawFeatureToggles()
8700: setAllFeatures()
8711: applyDriverFeatures()
8726: **PIX: conferência do código e QR code desenhado no aparelho**
8727: crc16()
8735: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
8737: pixTxt()
8738: pixCampo()
8739: pixGerarCodigo()
8749: pixAutoLigado()
8750: pixAutoMudou()
8755: gerarPixAuto()
8771: pixRecebedorCarregar()
8782: pixRecebedorGuardar()
8789: pixValid()
8795: renderPixQr()
8805: previewNewPixQr()
8815: **FOTO DO MOTORISTA (recortada da CNH)**
8816: photoPath()
8817: fileToCanvas()
8836: cropPhoto()
8850: savePhoto()
8855: photoBoxFrom()
8861: fillAvatar()
8872: fillAvatars()
8885: storedFile()
8892: photoFromCnh()
8904: **FOTO DO PERFIL ACOMPANHA A CNH**
8907: cnhStamp()
8908: photoFiles()
8916: avatarPath()
8921: syncCnhPhotos()
8945: pickImage()
8948: changeDriverPhoto()
8964: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
8966: uploadTmp()
8973: clearTmp()
8978: aiReadFiles()
8984: okDateISO()
8986: noAccents()
8988: makeUsername()
8997: titleCase()
8998: syncNewDriverAccess()
9004: setNewDriverPhoto()
9009: pickNewDriverPhoto()
9013: resetNewDriverForm()
9021: newDriverDocChosen()
9055: anoCrlv()
9059: formatVehicleBrand()
9064: inferVehicleBrand()
9073: normalizeCrlvFields()
9092: applyCrlvFields()
9105: aiReadCrlv()
9119: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
9120: sendWelcomeEmail()
9126: showCredentials()
9137: demoAssistente()
9156: **PERGUNTAR À IA (ÁREA IA, só o master)**
9160: iaChatReset()
9161: iaNorm()
9162: iaAcha()
9168: iaVeicTxt()
9169: iaCamposVeic()
9170: iaDataOk()
9171: iaOpcoes()
9172: iaTodosMotoristas()
9176: iaFerramenta()
9271: renderIAChat()
9288: iaChatDica()
9289: iaChatEnviar()
9324: iaChatNota()
9325: iaCancelarCartao()
9326: iaConfirmarCartao()
9371: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
9372: syncAppFinState()
9381: renderAppEarnings()
9461: saveAppEarning()
9488: workDayISO()
9489: paintDayOff()
9498: renderDayOff()
9505: setDayOff()
9515: aiReadEarning()
9548: **DESPESAS DO APLICATIVO**
9550: appExpCustomTypes()
9551: fillAppExpTypes()
9558: onAppExpTypeChange()
9563: saveAppExpense()
9588: deleteAppExpense()
9597: deleteAppEarning()
9694: loadTermsAcceptances()
9706: termsOf()
9707: currentAcceptance()
9708: needsTermsAcceptance()
9711: fmtDateTime()
9714: termsPlainText()
9718: termsHash()
9726: openTermsGate()
9749: termsGateCheck()
9757: acceptTerms()
9777: acceptanceHtml()
9788: openTermsViewer()
9806: closeTerms()
9812: downloadTermsCopy()
9833: termsBadgeMaster()
9840: termsMasterDetail()
9881: renderTermsSetupBanner()
9894: copyTermsSql()
9904: cnhExpired()
9905: cnhWaiting()
9906: onlyDigits()
9907: normName()
9909: verifyCnh()
9921: renderCnhBanner()
9939: sendNewCnh()
9987: cnhBadgeMaster()
9995: applyPendingCnh()
10003: autoReadNewCnhs()
10021: cnhPendingHtml()
10035: recheckPendingCnh()
10045: rejectPendingCnh()
10055: showContractDoc()
10173: inspectPdfSignaturesBytes()
10192: readPdfFileAsBase64AndInspect()
10207: govBrSignersList()
10219: renderGovBrFlowBox()
10271: driverGovBrBlockHtml()
10300: govBrPublicAppBaseUrl()
10304: createGovBrInvite()
10336: submitMasterGovBrPdf()
10357: submitDriverGovBrPdf()
10376: loadGovBrInvitePage()
10447: submitGovBrInvitePdf()
10466: exitGovBrInviteToLogin()
10485: contractPeriodLabel()
10486: contractStatusBadge()
10490: pdfSafeText()
10502: contractPdfFileName()
10511: cwBuildDepositChargeText()
10550: cwBuildDepositClauseText()
10562: lcClauseStart()
10569: buildDefaultClauses()
10632: generateContractPdfBytes()
10651: drawHeader()
10656: newPage()
10663: ensureSpace()
10666: wrapLines()
10690: drawJustifiedLine()
10946: renderContractsTab()
11000: renderDriverRentalContractsBox()
11059: openContractForDriver()
11066: *WIZARD DE CRIAÇÃO / EDIÇÃO DE RASCUNHO / RENOVAÇÃO*
11068: closeContractWizard()
11069: cwPopulateSelects()
11077: cwPopulateLocadores()
11089: cwOnLocadorChange()
11098: defaultWitness1ForLocador()
11106: cwApplyDefaultWitness1()
11119: cwFillLocador()
11128: cwFillDepositFromDriver()
11156: cwFillDepositFromComercial()
11178: cwSyncClauseIdx()
11187: cwSyncDepositClauseOnly()
11188: cwUpdateTrialPreview()
11204: cwDepCalc()
11249: cwApplyDriverContractDefaults()
11266: cwFillDriver()
11285: cwUpdateCrlvBar()
11294: cwNeedsCrlvFill()
11298: cwRefreshMissingBoxIfVisible()
11307: cwReadVehicleCrlv()
11356: cwReadCurrentVehicleCrlv()
11362: cwFillVehicle()
11384: cwOnDriverChange()
11400: cwOnVehicleChange()
11413: cwDefaultChecklist()
11418: cwToggleVistoriaFields()
11423: cwRenderInspChecklist()
11442: cwRenderInspDamagesSummary()
11456: cwRenderInspPhotos()
11492: cwUpdateInspPhotoDamage()
11500: cwSyncVistoriaFromVehicle()
11513: cwImportSavedPhotos()
11525: cwUploadInspPhotos()
11565: cwAnalyzeInspWithAI()
11574: cwReadSnapshot()
11633: cwRenderClausesEditor()
11643: cwRebuildClauses()
11651: cwRenderPreview()
11706: cwTogglePreview()
11711: validateContractForEmission()
11728: openContractWizard()
11865: cwSyncSources()
11920: logContractHistory()
11929: persistContract()
12020: saveContractDraft()
12021: emitContract()
12023: ensureContractPdfBlob()
12034: downloadContractPdf()
12046: printContractPdf()
12059: *MODAL DETALHE, ASSINATURAS, UPLOAD ASSINADO, RENOVAR, ENCERRAR, CANCELAR*
12060: closeContractDetail()
12061: openContractDetail()
12133: saveContractSignatures()
12158: uploadSignedContractFile()
12178: terminateContractPrompt()
12193: cancelContractPrompt()
12233: inspectionTypeBadge()
12237: inspectionStatusBadge()
12241: inspectionPdfFileName()
12248: switchContractsSubtab()
12261: renderInspectionsTab()
12321: *ANALISADOR DE IA EM LOTE + CONFIRMAÇÃO PRESENCIAL DE DANOS*
12322: runInspectionBatchAI()
12345: promptInspectionDamageConfirmation()
12423: processInspectionPhotosWithAI()
12479: analyzeSavedInspectionPhotos()
12495: renameInspectionPhoto()
12511: *WIZARD DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO)*
12514: closeInspectionWizard()
12515: openInspectionWizard()
12582: iwCollectSavedPhotosFor()
12615: iwPopulateContractsAndBase()
12638: iwSyncHeaderAndLegal()
12650: iwOnTypeChange()
12656: iwOnVehicleChange()
12674: iwOnDriverChange()
12679: iwOnContractChange()
12686: iwImportSavedPhotos()
12697: iwUploadPhotos()
12750: iwResolveEntregaBaseline()
12771: iwRunAIOnList()
12797: iwAnalyzeWithAI()
12804: iwRenderPhotos()
12842: iwUpdatePhotoField()
12847: iwUpdatePhotoDamage()
12855: iwRemovePhoto()
12861: iwRenderDamagesSummary()
12876: iwRenderComparison()
12895: iwRenderChecklist()
12914: persistInspectionTerm()
13017: saveInspectionDraft()
13018: emitInspectionTerm()
13020: *GERADOR DE PDF A4 DE VISTORIA E DEVOLUÇÃO (com grid real de fotos)*
13021: blobToEmbeddableJpeg()
13050: generateInspectionPdfBytes()
13241: ensureInspectionPdfBlob()
13251: downloadInspectionPdf()
13263: printInspectionPdf()
13276: *MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA*
13277: closeInspectionDetail()
13278: openInspectionDetail()
13335: saveInspectionSignatures()
13359: uploadSignedInspectionFile()
13379: cancelInspectionPrompt()

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

## supabase/functions/motora-asaas/index.ts (656 linhas)

22: serviceKey()
29: json()
31: brl()
32: r2()
36: secret()
41: asaas()
54: avisar()
64: hojeBR()
65: proximoDia()
72: proximaParcela()
83: cauParcela()
92: ajusteVale()
95: tirarAjustes()
103: getAtrasoConfig()
107: atrasoDataBR()
112: atrasoPrazoUtil()
119: calcEncargosAtraso()
137: ehLinhaEncargo()
139: cobrarMotorista()
152: *valores (mesma regra do Novo Pix)*
180: *QR code Pix estático com o valor da semana (sem taxa até 100 Pix/mês)*
183: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
204: criarQrAsaasEUpload()
227: saldoAbertoMotorista()
287: salvarQrParcialNoPerfil()
298: atualizarQrAtrasoMotorista()
332: cobrarTodos()
363: *pagamento recebido*
364: quemPagou()
387: pagamentoRecebido()
477: usuarioAuth()
486: ehMaster()
491: pixParcialMotorista()
550: autorizarParcial()
591: preparar()
592: limpa()
627: acao "pix_parcial"
630: acao "autorizar_parcial"
635: acao "preparar"
638: acao "atualizar_atraso"
649: acao "cobrar"

## supabase/functions/motora-assinatura/index.ts (479 linhas)

7: serviceKey()
27: json()
47: maskCpf()
53: inspectPdfSignatures()
77: makeToken()
84: resolveDoc()
91: publicDocSummary()
128: authUser()

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

## supabase/functions/motora-lembretes/index.ts (367 linhas)

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
124: r2()
125: atrasoDataBR()
130: atrasoPrazoUtil()
137: calcEncargosAtraso()
155: ehLinhaEncargo()
158: emAberto()
181: avisoAtraso()
204: **4) PIX AUTOMÁTICO DO MOTORA**
206: crc16()
211: campo()
212: txtPix()
213: codigoPix()
220: chaveNormal()
227: proximaParcela()
235: pixAutomatico()
242: *valores (mesma regra do Novo Pix e do Asaas)*
269: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
290: pixAutoTodos()
314: enviar()
323: lembrar()

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

## supabase/functions/motora-push/index.ts (443 linhas)

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

## supabase/functions/motora-sync/index.ts (573 linhas)

5: serviceKey()
17: json()
19: secret()
24: readFile()
33: drive()
42: stamp()
44: driverInfo()
50: syncDoc()
58: uploadReceipt()
66: syncPix()
78: syncExpense()
91: *DOCUMENTOS DO VEÍCULO, VISTORIA E TERMOS (envio automático ao Drive)*
92: vehicleInfo()
98: syncVehicleDoc()
105: syncInspection()
113: escHtml()
114: syncTerms()
129: *fim*
131: *E-MAIL: a IA escreve, o dono confere no app e confirma o envio*
132: regrasDono()
137: emailDraft()
155: sendEmail()
163: *fim do e-mail*
165: **LEITURA DE DOCUMENTOS E VISTORIA COM IA (Gemini)**
168: modelosGemini()
184: callGemini()
238: expensePrompt()
246: earningPrompt()
258: callGeminiDriver()
260: aiReadFiles()
273: aiAnalyzeInspection()
314: driverWelcome()
329: *CONFERÊNCIA DE COMPROVANTE COM IA*
336: geminiOnFiles()
346: nameWords()
350: brl()
351: dBR()
353: pushAlert()
362: notifyMasters()
363: notifyDriver()
365: verifyReceipt()
372: save()
421: checkDriverCnh()
436: dig()
457: driverCnhCheck()
467: dig()
492: aiRead()
514: type "doc"
515: type "receipt"
516: type "pix"
517: type "expense"
518: type "vehicle_doc"
519: type "inspection"
520: type "terms"
521: type "verify_receipt"
522: type "driver_cnh"
531: type "driver_cnh_check"
534: type "ai_read"
535: type "verify_receipt"
536: type "ai_read_files"
541: type "ai_analyze_inspection"
546: type "driver_welcome"
547: type "email_draft"
548: type "send_email"
550: type "drive_ping"
551: type "drive_resync"

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
- supabase/2026-11-12-atraso-juros-asaas.sql: MOTORA — 12/11/2026: Juros e multa por inadimplência alinhados ao Asaas (10% multa + 2% ao mês pro rata die, QR estático sem tarifa)
- supabase/2026-11-12-caucao-valor-contrato.sql: Inclui o valor pago de caução no encerramento de contrato e na mensagem ao motorista
- supabase/2026-11-12-contrato-caucao-arquivo.sql: Contagem de 30 dias da caução após encerramento do contrato + "Caução pago" e arquivamento da ficha
- supabase/2026-11-12-contrato-parcial-financeiro.sql: MOTORA: vincula histórico de Pix ao veículo, adiciona encerramento de contrato e atualização segura de QR parcial (Asaas)
- supabase/2026-11-12-modulo-contratos.sql: Módulo de Contratos de Locação (12/11/2026)
- supabase/2026-11-12-modulo-vistorias.sql: Módulo Unificado de Vistorias Veiculares e Devolução com IA (12/11/2026)
- supabase/2026-11-13-govbr-assinaturas.sql: Fluxo oficial de assinaturas eletrônicas via Portal GOV.BR (assinador.iti.br)
