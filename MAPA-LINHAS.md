# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 12/11/2026, 20:58:59. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (10022 linhas)

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
243: <!-- PAINEL DO MOTORISTA -->
244: #secDriverPanel
246: <!-- Card do Veículo Vinculado -->
260: <!-- Renderizado via JS: Status "Em dia" ou "Em atraso" -->
270: <!-- Botão "Instalar app" (só aparece em celular Android, fora do próprio app) -->
275: <!-- Aviso: nova versão do app Android -->
278: <!-- Aviso vermelho: notificações desligadas -->
281: <!-- Aviso vermelho: CNH vencida (com botão para enviar a nova) -->
285: <!-- Aviso de Pix / pagamento pendente -->
288: <!-- Navegação de Abas -->
306: <!-- Conteúdo das Abas Motorista -->
309: <!-- Aba CRLV-e -->
310: #tabDrvCrlv
315: <!-- Renderizado dinamicamente -->
319: <!-- Aba Contrato -->
320: #tabDrvContract
330: <!-- Renderizado dinamicamente -->
334: <!-- Aba Vistoria -->
335: #tabDrvInspection
342: <!-- Aba Pagamento -->
343: #tabDrvPayment
356: <!-- Caução e multas do motorista -->
358: <!-- Valor e descrição da cobrança -->
368: <!-- Seção Pix -->
382: <!-- QR Code Renderizado aqui -->
415: <!-- Seção Upload de Comprovante -->
432: <!-- Lista de comprovantes -->
437: <!-- Recibos quando o contrato está encerrado -->
444: <!-- PAINEL MASTER (ADMINISTRAÇÃO) -->
445: #secMasterPanel
485: <!-- Aviso: falta criar a tabela dos termos no banco -->
488: <!-- SUB-ABA: GESTÃO DE VEÍCULOS -->
490: <!-- Lista de Veículos -->
506: <!-- Renderizado via JS -->
513: <!-- Form de Adicionar Veículo -->
560: <!-- SUB-ABA: CONTRATOS DE LOCAÇÃO -->
608: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
614: <!-- Lista de Motoristas (sem moldura: os cartões já são a moldura) -->
619: <!-- Cartões dos motoristas: renderizados em renderMasterPanel (cartão curto + "Mais ações") -->
624: <!-- Fichas Arquivadas (após marcar caução pago) -->
633: <!-- Form de Adicionar Motorista -->
728: <!-- Barra de baixo do dono (só no design novo) -->
739: <!-- MODAL PRIMEIRO LOGIN -->
740: #modalFirstLogin
774: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
775: #modalNotif
788: <!-- MODAL VISTORIA (MASTER) -->
789: #modalInspection
802: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
803: #modalSettings
910: <!-- MODAL TEMAS -->
911: #modalThemes
922: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
923: #modalCreds
938: <!-- JANELA DE CONFIRMAÇÃO DO APP (substitui confirm/prompt do navegador; ver uiDialogo) -->
953: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
954: #modalDriverFile
996: <!-- CONTRATO DE LOCAÇÃO (rental_contracts + ações) -->
1000: <!-- ENCERRAMENTO DE CONTRATO (profiles.pix_extra.contrato_encerrado) -->
1029: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
1044: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
1086: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
1087: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
1088: #modalRecibo
1107: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
1108: #modalPixArea
1124: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
1125: #modalIA
1207: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1208: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1209: #modalEditVeh
1241: #modalSenha
1263: #modalMeusRecibos
1281: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1282: #modalEmail
1302: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1303: #modalReport
1318: #modalFinCardDetail
1331: #modalFinance
1364: <!-- FILTROS -->
1414: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1434: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1435: #modalExpenses
1470: <!-- MODAL NOVO PIX -->
1471: #modalNewPix
1523: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1581: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1582: #modalCorrigirRecibo
1596: <!-- MODAL WIZARD DE CONTRATO DE LOCAÇÃO -->
1597: #modalContractWizard
1613: <!-- Seleção Motorista & Veículo -->
1625: <!-- Locador -->
1642: <!-- Locatário -->
1663: <!-- Veículo -->
1682: <!-- Configuração Comercial -->
1721: <!-- Cláusulas editáveis -->
1733: <!-- Prévia -->
1747: <!-- MODAL DETALHE, ASSINATURAS E HISTÓRICO DO CONTRATO -->
1748: #modalContractDetail
1761: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
1762: #modalDocViewer
1770: #modalDocBody
1771: <!-- Conteúdo pré-visualizado -->
1777: #modalTerms
1791: <!-- NOTIFICAÇÕES TOAST -->
1808: lsGet()
1809: lsSet()
1810: lsDel()
1833: demoLoginRole()
1837: demoId()
1838: demoSave()
1839: demoSaved()
1841: *datas no horário de Brasília*
1842: demoLocal()
1843: demoParts()
1844: demoDay()
1845: demoNextDue()
1850: *dados fictícios (4 meses)*
1851: demoBuild()
2038: *documentos fictícios (imagem gerada na hora)*
2039: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
2040: demoDocBlob()
2118: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
2119: demoQuery()
2142: out()
2148: run()
2189: demoOnUpdate()
2199: demoOnInsert()
2305: demoClient()
2370: demoStart()
2378: demoStop()
2384: abrirDemo()
2391: trocarDemo()
2396: demoBanner()
2411: toEmail()
2415: showLogin()
2419: esc()
2424: dataHoraBR()
2432: uiDialogo()
2480: uiConfirm()
2489: uiPrompt()
2495: friendlyError()
2505: devicePrefs()
2508: saveDevicePrefs()
2511: docRef()
2512: viewDocIdx()
2514: setBusy()
2552: **TEMAS**
2561: currentTheme()
2566: applyTheme()
2567: openThemes()
2577: pickTheme()
2583: toggleDarkMode()
2585: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
2587: loadDesignCfg()
2594: applyDesign()
2611: markMasterNav()
2618: fillDesignCfg()
2623: saveDesign()
2637: showToast()
2646: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
2647: senhaErro()
2648: abrirSenha()
2657: salvarIaCodigo()
2667: fecharSenha()
2668: salvarSenha()
2689: loginUserInput()
2694: loginErro()
2698: verSenha()
2703: handleLogin()
2752: logout()
2771: saveFirstLoginPreferences()
2794: carregarDados()
2824: aplicarDados()
2856: loadAndRender()
2883: autoRefresh()
2922: markUpdated()
2927: reload()
2932: renderApp()
2980: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
2983: masterBack()
2985: viewAsDriver()
3007: exitViewAs()
3026: viewOnly()
3027: renderViewAsBanner()
3037: showSection()
3042: withBtn()
3050: toggleDriverStatus()
3059: isOnline()
3061: updateStatusToggleUI()
3074: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
3083: checkApkUpdate()
3098: updateInstallApkButton()
3118: renderDriverPanel()
3343: switchDriverTab()
3358: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
3361: parsePixKey()
3365: normalizePixKey()
3373: pixKeyLooksOk()
3381: togglePixKeyFields()
3387: updatePixKeyPlaceholder()
3393: copyPixKey()
3400: copyPixCode()
3412: receiptBadge()
3422: receiptMasterBox()
3449: receiptAction()
3456: confirmReceipt()
3469: rejectReceipt()
3481: recheckReceipt()
3490: uploadReceipt()
3513: switchMasterTab()
3532: maskPhone()
3541: waLink()
3546: allVeh()
3547: allDrv()
3548: chargeVehicleId()
3560: enviarPedidoParcialAsaas()
3576: pedirPixParcial()
3594: restaurarPixTotal()
3600: responderPixParcial()
3624: contrato30Info()
3654: encerrarContrato()
3671: encerrarContratoPrompt()
3684: reativarContrato()
3708: marcarCaucaoPagoArquivar()
3729: desarquivarFicha()
3747: deliveryInspectionHtml()
3777: uploadDeliveryPhotos()
3804: delDeliveryPhoto()
3822: addCauDesconto()
3847: puxarMultaCaucao()
3868: delCauDesconto()
3890: dfCauDescontosHtml()
3923: dfContratoRender()
3967: encerrarContratoConfirmFicha()
3974: renderMasterPanel()
4138: renderArchivedDrivers()
4183: handleAddVehicle()
4223: deleteVehicle()
4224: cancelDeleteVehicle()
4226: confirmDeleteVehicle()
4250: abrirEditarVeiculo()
4272: fecharEditarVeiculo()
4273: salvarEditarVeiculo()
4310: drvCauMostra()
4317: drvCauLer()
4325: handleAddDriver()
4403: marcarSituacao()
4413: updateDriverPaymentStatus()
4422: deleteDriver()
4423: cancelDeleteDriver()
4425: confirmDeleteDriver()
4448: prepareFile()
4470: uploadFile()
4481: fileUrl()
4492: downloadName()
4496: renderFilePreview()
4516: renderPdfToCanvas()
4543: viewDoc()
4564: **DINHEIRO**
4565: parseMoney()
4572: fmtMoney()
4573: fmtDate()
4574: todayISO()
4576: **CONFIGURAÇÕES (Gemini e Google Drive)**
4578: loadConfigStatus()
4583: paintConfig()
4588: fillOwnerVehicleSelect()
4594: saveOwnerVehicle()
4616: locadorMerged()
4626: fillLocadorSettings()
4630: saveLocadorSettings()
4662: openSettings()
4676: closeSettings()
4677: saveConfig()
4687: **ASAAS (Financeiro: chave por motorista ativo + Config: conta API)**
4688: renderAsaasDrivers()
4715: toggleDriverAsaas()
4747: loadAsaasInfo()
4761: saveAsaas()
4769: testarAsaas()
4776: copiarAsaas()
4780: testDrive()
4787: resyncDrive()
4795: **FICHA DO MOTORISTA**
4798: openDriverFile()
4830: closeDriverFile()
4832: saveDriverFile()
4897: aiFillDriver()
4936: **CONTROLE FINANCEIRO**
4937: finRange()
4954: dayBR()
4955: inRange()
4957: onFinPeriodChange()
4963: fillFinFilters()
4971: clearFinFilters()
4975: updateFinFilterCount()
4984: openFinance()
4990: switchFinTab()
5001: finCardBtn()
5009: closeFinCardDetail()
5010: closeFinance()
5012: collectRentFinData()
5063: renderFinance()
5121: openFinCardDetail()
5328: openFinExtrato()
5422: renderFinExtratoView()
5503: openFinExtratoReport()
5520: renderFinGrafico()
5540: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
5542: okEmail()
5544: openEmailCompose()
5565: closeEmailCompose()
5566: sendEmailCompose()
5581: emailRecibo()
5586: emailIA()
5594: **RELATÓRIO DO FINANCEIRO**
5596: finFiltersText()
5601: finPeriodText()
5608: buildReportHtml()
5630: openFinReport()
5640: closeFinReport()
5641: printFinReport()
5645: shareFinReport()
5655: emailFinReport()
5661: **DESPESAS DO VEÍCULO**
5663: openExpenses()
5675: closeExpenses()
5676: fillExpenseTypes()
5681: createExpenseType()
5696: aiReadExpense()
5728: renderExpenses()
5750: saveExpense()
5777: deleteExpense()
5802: photoCard()
5831: inspectionHtml()
5857: hydrateImages()
5863: openInspection()
5871: closeInspection()
5875: renderInspectionModal()
5882: uploadInspection()
5913: deleteInspectionPhoto()
5933: fmtDue()
5939: nextDueLocal()
5950: openNewPix()
5980: **CAUÇÃO DO MOTORISTA**
5981: cauOf()
5982: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
5983: devOf()
5984: devCobrancas()
5986: devPrevisao()
5994: dfDevRender()
6021: dfDevIr()
6022: dfDevSalvar()
6027: dfDevAvisar()
6033: dfDevDesfazer()
6037: dfDevReceber()
6046: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
6050: cauPlano()
6058: cauParcela()
6065: cauParcelasTexto()
6069: cauNext()
6076: dfCauFill()
6086: dfCauCalc()
6114: dfCauRead()
6127: expTypeName()
6131: driverFinVehicleId()
6143: cauEntradaItem()
6157: cauPagoDespesaItem()
6172: **CAUÇÃO: quanto já foi pago**
6174: cauStatus()
6184: obsResumoHtml()
6185: cauResumoHtml()
6190: **MULTAS E OUTRAS DESPESAS**
6191: multasOf()
6193: multaPagaAuto()
6198: multasAbertas()
6199: multasPendentes()
6200: multasResumoHtml()
6208: cobOf()
6209: dfCobFill()
6215: dfCobRead()
6218: dfCobInfo()
6228: cobResumoHtml()
6232: ajustesOf()
6236: ajusteVale()
6237: isoDia()
6239: vencProxima()
6240: previsaoProxima()
6254: previsaoHtml()
6258: dfAjRender()
6264: addAjuste()
6273: delAjuste()
6278: abrirAjustes()
6279: renderProxCobrancas()
6285: savePixExtra()
6293: dfMultFill()
6301: fdPaga()
6302: dfMultRender()
6311: toggleMultas()
6318: addMulta()
6328: delMulta()
6336: multaPaga()
6345: renderDriverExtras()
6373: mondayAfter()
6381: renderDriverProfileExtras()
6447: semanaDoPix()
6453: **MEUS RECIBOS (área do motorista)**
6455: meusRecibosLista()
6459: reciboRowHtml()
6467: renderEncerradoRecibos()
6472: openMeuReciboDireto()
6473: openMeusRecibos()
6480: closeMeusRecibos()
6481: reciboPdfHtml()
6492: verMeuRecibo()
6499: voltarMeusRecibos()
6500: pdfMeuRecibo()
6504: shareMeuRecibo()
6513: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
6514: editVehicleRent()
6531: nextParcel()
6537: fillNewPixValues()
6573: newPixParts()
6604: **PERÍODO E VENCIMENTO DA COBRANÇA**
6605: dataISO()
6606: dataDe()
6607: dataMais()
6608: dataBR()
6609: diasEntre()
6610: isoSP()
6611: pixPeriodo()
6618: pixDesc()
6619: pixDiasPeriodo()
6624: marcarAjustesPorVenc()
6629: pixDatasNovo()
6638: pixDatasMudou()
6649: pixAluguelProporcional()
6657: pixPeriodoInfo()
6670: pixAddLinha()
6677: pixLinhas()
6679: descSoma()
6689: calcNewPix()
6698: **RECIBO DE PAGAMENTO**
6702: receiptValue()
6703: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
6704: atrasoDados()
6711: cobrarAtraso()
6727: allocatePix()
6746: reciboData()
6769: fmtDateTimeBR()
6770: reciboTexto()
6821: openRecibo()
6838: closeRecibo()
6839: **CORRIGIR RECIBO**
6841: corrigirLinhaHtml()
6851: openCorrigirRecibo()
6874: closeCorrigirRecibo()
6875: corrigirLer()
6881: corrigirSoma()
6888: salvarCorrigirRecibo()
6905: copyRecibo()
6910: reciboCanvas()
6927: reciboPdfBlob()
6945: shareReciboPdf()
6961: rotularTabelas()
6979: areaAberta()
6980: markAreas()
6990: closeAreas()
6994: toggleArea()
7002: dobraSalva()
7003: setDobra()
7008: toggleDobra()
7015: dobraTopo()
7022: renderMasterResumo()
7036: renderMasterTopo()
7058: loadIA()
7080: updateIABadge()
7085: loadIASetting()
7091: paintIASwitch()
7097: toggleIA()
7104: loadRobo()
7113: iaPrepararQr()
7118: paintRobo()
7147: pedirCodigoRobo()
7156: toggleRobo()
7171: iaTodosGerar()
7189: iaTodosCancelar()
7193: iaTodosConfirmar()
7207: loadIARules()
7212: iaAbrirPdf()
7218: renderIARules()
7222: saveIARules()
7227: addIARule()
7232: delIARule()
7236: openIA()
7251: closeIA()
7252: iaShow()
7253: iaPhone()
7258: renderIA()
7300: iaAprovar()
7309: iaPhone2()
7310: iaSend()
7341: iaMark()
7352: iaDelete()
7363: openPixArea()
7372: closePixArea()
7373: renderPixArea()
7409: openEditPix()
7438: deletePix()
7450: closeNewPix()
7452: saveNewPix()
7543: pushSupported()
7544: isIOS()
7545: isStandalone()
7546: b64ToBytes()
7552: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
7557: notifStatus()
7565: stepsList()
7569: notifHelpHtml()
7603: renderNotifModal()
7615: checkDriverNotifications()
7648: activateFromModal()
7661: refreshNotifButton()
7680: subscribePush()
7695: enableNotifications()
7715: closeDocViewer()
7723: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
7735: allFeaturesOn()
7736: feat()
7737: loadDriverFeatures()
7744: saveDriverFeatures()
7748: drawFeatureToggles()
7763: setAllFeatures()
7774: applyDriverFeatures()
7789: **PIX: conferência do código e QR code desenhado no aparelho**
7790: crc16()
7798: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
7800: pixTxt()
7801: pixCampo()
7802: pixGerarCodigo()
7812: pixAutoLigado()
7813: pixAutoMudou()
7818: gerarPixAuto()
7834: pixRecebedorCarregar()
7845: pixRecebedorGuardar()
7852: pixValid()
7858: renderPixQr()
7868: previewNewPixQr()
7878: **FOTO DO MOTORISTA (recortada da CNH)**
7879: photoPath()
7880: fileToCanvas()
7899: cropPhoto()
7913: savePhoto()
7918: photoBoxFrom()
7924: fillAvatar()
7935: fillAvatars()
7948: storedFile()
7955: photoFromCnh()
7967: **FOTO DO PERFIL ACOMPANHA A CNH**
7970: cnhStamp()
7971: photoFiles()
7979: avatarPath()
7984: syncCnhPhotos()
8008: pickImage()
8011: changeDriverPhoto()
8027: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
8029: uploadTmp()
8036: clearTmp()
8041: aiReadFiles()
8047: okDateISO()
8049: noAccents()
8051: makeUsername()
8060: titleCase()
8061: syncNewDriverAccess()
8067: setNewDriverPhoto()
8072: pickNewDriverPhoto()
8076: resetNewDriverForm()
8084: newDriverDocChosen()
8118: anoCrlv()
8119: aiReadCrlv()
8136: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
8137: sendWelcomeEmail()
8143: showCredentials()
8154: demoAssistente()
8173: **PERGUNTAR À IA (ÁREA IA, só o master)**
8177: iaChatReset()
8178: iaNorm()
8179: iaAcha()
8185: iaVeicTxt()
8186: iaCamposVeic()
8187: iaDataOk()
8188: iaOpcoes()
8189: iaTodosMotoristas()
8193: iaFerramenta()
8288: renderIAChat()
8305: iaChatDica()
8306: iaChatEnviar()
8341: iaChatNota()
8342: iaCancelarCartao()
8343: iaConfirmarCartao()
8388: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
8389: syncAppFinState()
8398: renderAppEarnings()
8478: saveAppEarning()
8505: workDayISO()
8506: paintDayOff()
8515: renderDayOff()
8522: setDayOff()
8532: aiReadEarning()
8565: **DESPESAS DO APLICATIVO**
8567: appExpCustomTypes()
8568: fillAppExpTypes()
8575: onAppExpTypeChange()
8580: saveAppExpense()
8605: deleteAppExpense()
8614: deleteAppEarning()
8711: loadTermsAcceptances()
8723: termsOf()
8724: currentAcceptance()
8725: needsTermsAcceptance()
8728: fmtDateTime()
8731: termsPlainText()
8735: termsHash()
8743: openTermsGate()
8766: termsGateCheck()
8774: acceptTerms()
8794: acceptanceHtml()
8805: openTermsViewer()
8823: closeTerms()
8829: downloadTermsCopy()
8850: termsBadgeMaster()
8857: termsMasterDetail()
8898: renderTermsSetupBanner()
8911: copyTermsSql()
8921: cnhExpired()
8922: cnhWaiting()
8923: onlyDigits()
8924: normName()
8926: verifyCnh()
8938: renderCnhBanner()
8956: sendNewCnh()
9004: cnhBadgeMaster()
9012: applyPendingCnh()
9020: autoReadNewCnhs()
9038: cnhPendingHtml()
9052: recheckPendingCnh()
9062: rejectPendingCnh()
9072: showContractDoc()
9135: contractPeriodLabel()
9136: contractStatusBadge()
9140: pdfSafeText()
9152: contractPdfFileName()
9161: buildDefaultClauses()
9201: generateContractPdfBytes()
9220: drawHeader()
9225: newPage()
9232: ensureSpace()
9235: wrapLines()
9259: drawJustifiedLine()
9372: renderContractsTab()
9425: renderDriverRentalContractsBox()
9458: openContractForDriver()
9465: *WIZARD DE CRIAÇÃO / EDIÇÃO DE RASCUNHO / RENOVAÇÃO*
9467: closeContractWizard()
9468: cwPopulateSelects()
9476: cwFillLocador()
9483: cwFillDriver()
9497: cwFillVehicle()
9518: cwOnDriverChange()
9526: cwOnVehicleChange()
9532: cwReadSnapshot()
9558: cwRenderClausesEditor()
9568: cwRebuildClauses()
9576: cwRenderPreview()
9605: cwTogglePreview()
9610: validateContractForEmission()
9627: openContractWizard()
9705: cwSyncSources()
9738: logContractHistory()
9747: persistContract()
9835: saveContractDraft()
9836: emitContract()
9838: ensureContractPdfBlob()
9848: downloadContractPdf()
9860: printContractPdf()
9873: *MODAL DETALHE, ASSINATURAS, UPLOAD ASSINADO, RENOVAR, ENCERRAR, CANCELAR*
9874: closeContractDetail()
9875: openContractDetail()
9944: saveContractSignatures()
9969: uploadSignedContractFile()
9989: terminateContractPrompt()
10004: cancelContractPrompt()

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
- supabase/2026-11-12-modulo-contratos.sql: Módulo de Contratos de Locação (12/11/2026)
