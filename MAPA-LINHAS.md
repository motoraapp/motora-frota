# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 13/11/2026, 00:16:21. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (12344 linhas)

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
560: <!-- SUB-ABA: CONTRATOS DE LOCAÇÃO E VISTORIAS -->
660: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
666: <!-- Lista de Motoristas (sem moldura: os cartões já são a moldura) -->
671: <!-- Cartões dos motoristas: renderizados em renderMasterPanel (cartão curto + "Mais ações") -->
676: <!-- Fichas Arquivadas (após marcar caução pago) -->
685: <!-- Form de Adicionar Motorista -->
780: <!-- Barra de baixo do dono (só no design novo) -->
791: <!-- MODAL PRIMEIRO LOGIN -->
792: #modalFirstLogin
826: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
827: #modalNotif
840: <!-- MODAL VISTORIA (MASTER) -->
841: #modalInspection
854: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
855: #modalSettings
988: <!-- MODAL TEMAS -->
989: #modalThemes
1000: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
1001: #modalCreds
1016: <!-- JANELA DE CONFIRMAÇÃO DO APP (substitui confirm/prompt do navegador; ver uiDialogo) -->
1031: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
1032: #modalDriverFile
1074: <!-- CONTRATO DE LOCAÇÃO (rental_contracts + ações) -->
1078: <!-- ENCERRAMENTO DE CONTRATO (profiles.pix_extra.contrato_encerrado) -->
1107: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
1122: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
1164: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
1165: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
1166: #modalRecibo
1185: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
1186: #modalPixArea
1202: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
1203: #modalIA
1285: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1286: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1287: #modalEditVeh
1324: #modalSenha
1346: #modalMeusRecibos
1364: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1365: #modalEmail
1385: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1386: #modalReport
1401: #modalFinCardDetail
1414: #modalFinance
1447: <!-- FILTROS -->
1497: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1517: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1518: #modalExpenses
1553: <!-- MODAL NOVO PIX -->
1554: #modalNewPix
1606: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1664: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1665: #modalCorrigirRecibo
1679: <!-- MODAL WIZARD DE CONTRATO DE LOCAÇÃO -->
1680: #modalContractWizard
1696: <!-- Seleção Motorista & Veículo -->
1708: <!-- Locador -->
1729: <!-- Locatário -->
1750: <!-- Veículo -->
1773: <!-- Configuração Comercial -->
1850: <!-- Cláusulas editáveis -->
1862: <!-- Prévia -->
1876: <!-- MODAL DETALHE, ASSINATURAS E HISTÓRICO DO CONTRATO -->
1877: #modalContractDetail
1890: <!-- MODAL GERADOR DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO) -->
1891: #modalInspectionTerm
1952: <!-- Fotos da vistoria (lote + reuso + análise IA + confirmação obrigatória de avarias) -->
1975: <!-- Resumo de Avarias Confirmadas + Checklist Bilateral + Ressalvas -->
2002: <!-- MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA -->
2003: #modalInspectionTermDetail
2016: <!-- MODAL CONFIRMAÇÃO DE DANO DETECTADO PELA IA (OBRIGATÓRIO ANTES DE NOMEAR) -->
2017: #modalInspDamageConfirm
2032: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
2033: #modalDocViewer
2041: #modalDocBody
2042: <!-- Conteúdo pré-visualizado -->
2048: #modalTerms
2062: <!-- NOTIFICAÇÕES TOAST -->
2079: lsGet()
2080: lsSet()
2081: lsDel()
2104: demoLoginRole()
2108: demoId()
2109: demoSave()
2110: demoSaved()
2112: *datas no horário de Brasília*
2113: demoLocal()
2114: demoParts()
2115: demoDay()
2116: demoNextDue()
2121: *dados fictícios (4 meses)*
2122: demoBuild()
2340: *documentos fictícios (imagem gerada na hora)*
2341: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
2342: demoDocBlob()
2420: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
2421: demoQuery()
2444: out()
2450: run()
2491: demoOnUpdate()
2501: demoOnInsert()
2613: demoClient()
2703: demoStart()
2711: demoStop()
2717: abrirDemo()
2724: trocarDemo()
2729: demoBanner()
2744: toEmail()
2748: showLogin()
2752: esc()
2757: dataHoraBR()
2765: uiDialogo()
2813: uiConfirm()
2822: uiPrompt()
2828: friendlyError()
2838: devicePrefs()
2841: saveDevicePrefs()
2844: docRef()
2845: viewDocIdx()
2847: setBusy()
2885: **TEMAS**
2894: currentTheme()
2899: applyTheme()
2900: openThemes()
2910: pickTheme()
2916: toggleDarkMode()
2918: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
2920: loadDesignCfg()
2927: applyDesign()
2944: markMasterNav()
2951: fillDesignCfg()
2956: saveDesign()
2970: showToast()
2979: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
2980: senhaErro()
2981: abrirSenha()
2990: salvarIaCodigo()
3000: fecharSenha()
3001: salvarSenha()
3022: loginUserInput()
3027: loginErro()
3031: verSenha()
3036: handleLogin()
3085: logout()
3104: saveFirstLoginPreferences()
3127: carregarDados()
3159: aplicarDados()
3200: loadAndRender()
3227: autoRefresh()
3266: markUpdated()
3271: reload()
3276: renderApp()
3324: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
3327: masterBack()
3329: viewAsDriver()
3351: exitViewAs()
3370: viewOnly()
3371: renderViewAsBanner()
3381: showSection()
3386: withBtn()
3394: toggleDriverStatus()
3403: isOnline()
3405: updateStatusToggleUI()
3418: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
3427: checkApkUpdate()
3442: updateInstallApkButton()
3462: renderDriverPanel()
3720: switchDriverTab()
3735: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
3738: parsePixKey()
3742: normalizePixKey()
3750: pixKeyLooksOk()
3758: togglePixKeyFields()
3764: updatePixKeyPlaceholder()
3770: copyPixKey()
3777: copyPixCode()
3789: receiptBadge()
3799: receiptMasterBox()
3826: receiptAction()
3833: confirmReceipt()
3862: rejectReceipt()
3874: recheckReceipt()
3883: uploadReceipt()
3906: switchMasterTab()
3925: maskPhone()
3934: waLink()
3939: allVeh()
3940: allDrv()
3941: chargeVehicleId()
3953: enviarPedidoParcialAsaas()
3969: pedirPixParcial()
3987: restaurarPixTotal()
3993: responderPixParcial()
4017: contrato30Info()
4047: encerrarContrato()
4064: encerrarContratoPrompt()
4077: reativarContrato()
4101: marcarCaucaoPagoArquivar()
4122: desarquivarFicha()
4140: deliveryInspectionHtml()
4179: uploadDeliveryPhotos()
4206: delDeliveryPhoto()
4224: addCauDesconto()
4249: puxarMultaCaucao()
4270: delCauDesconto()
4292: dfCauDescontosHtml()
4325: dfContratoRender()
4369: encerrarContratoConfirmFicha()
4376: renderMasterPanel()
4540: renderArchivedDrivers()
4585: handleAddVehicle()
4625: deleteVehicle()
4626: cancelDeleteVehicle()
4628: confirmDeleteVehicle()
4652: abrirEditarVeiculo()
4674: evReadStoredCrlv()
4699: evReadChosenCrlv()
4715: fecharEditarVeiculo()
4716: salvarEditarVeiculo()
4753: drvCauMostra()
4760: drvCauLer()
4768: handleAddDriver()
4846: marcarSituacao()
4856: updateDriverPaymentStatus()
4865: deleteDriver()
4866: cancelDeleteDriver()
4868: confirmDeleteDriver()
4890: isImageFile()
4892: prepareFile()
4914: uploadFile()
4925: fileUrl()
4936: downloadName()
4940: renderFilePreview()
4960: renderPdfToCanvas()
4987: viewDoc()
5008: **DINHEIRO**
5009: parseMoney()
5016: fmtMoney()
5017: fmtDate()
5018: todayISO()
5020: **CONFIGURAÇÕES (Gemini e Google Drive)**
5022: loadConfigStatus()
5027: paintConfig()
5032: fillOwnerVehicleSelect()
5038: saveOwnerVehicle()
5060: locadorMerged()
5073: getLocadoresList()
5093: locadorForVehicle()
5102: fillLocadorSettings()
5122: cfgOnLocadorChange()
5123: upsertLocadorInList()
5153: deleteLocadorSetting()
5169: saveLocadorSettings()
5197: openSettings()
5212: closeSettings()
5213: saveConfig()
5223: **ASAAS (Financeiro: chave por motorista ativo + Config: conta API)**
5224: renderAsaasDrivers()
5251: toggleDriverAsaas()
5283: getAtrasoCfg()
5287: fillAtrasoCfg()
5294: saveAtrasoCfg()
5311: atrasoDataBR()
5316: atrasoPrazoUtil()
5323: calcEncargosAtraso()
5342: ehLinhaEncargo()
5343: calcAtrasoMotorista()
5373: atualizarPixAtraso()
5386: loadAsaasInfo()
5400: saveAsaas()
5408: testarAsaas()
5415: copiarAsaas()
5419: testDrive()
5426: resyncDrive()
5434: **FICHA DO MOTORISTA**
5437: openDriverFile()
5469: closeDriverFile()
5471: saveDriverFile()
5536: aiFillDriver()
5575: **CONTROLE FINANCEIRO**
5576: finRange()
5593: dayBR()
5594: inRange()
5596: onFinPeriodChange()
5602: fillFinFilters()
5610: clearFinFilters()
5614: updateFinFilterCount()
5623: openFinance()
5629: switchFinTab()
5640: finCardBtn()
5648: closeFinCardDetail()
5649: closeFinance()
5651: collectRentFinData()
5702: renderFinance()
5760: openFinCardDetail()
5967: openFinExtrato()
6061: renderFinExtratoView()
6142: openFinExtratoReport()
6159: renderFinGrafico()
6179: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
6181: okEmail()
6183: openEmailCompose()
6204: closeEmailCompose()
6205: sendEmailCompose()
6220: emailRecibo()
6225: emailIA()
6233: **RELATÓRIO DO FINANCEIRO**
6235: finFiltersText()
6240: finPeriodText()
6247: buildReportHtml()
6269: openFinReport()
6279: closeFinReport()
6280: printFinReport()
6284: shareFinReport()
6294: emailFinReport()
6300: **DESPESAS DO VEÍCULO**
6302: openExpenses()
6314: closeExpenses()
6315: fillExpenseTypes()
6320: createExpenseType()
6335: aiReadExpense()
6367: renderExpenses()
6389: saveExpense()
6416: deleteExpense()
6445: inspSlotLabel()
6448: normalizeInspDbSlot()
6451: photoDamageBadge()
6460: photoCard()
6498: inspectionHtml()
6545: hydrateImages()
6551: openInspection()
6559: closeInspection()
6563: renderInspectionModal()
6570: uploadInspection()
6627: deleteInspectionPhoto()
6647: fmtDue()
6653: nextDueLocal()
6664: openNewPix()
6694: **CAUÇÃO DO MOTORISTA**
6695: cauOf()
6696: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
6697: devOf()
6698: devCobrancas()
6700: devPrevisao()
6708: dfDevRender()
6735: dfDevIr()
6736: dfDevSalvar()
6741: dfDevAvisar()
6747: dfDevDesfazer()
6751: dfDevReceber()
6760: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
6764: cauPlano()
6772: cauParcela()
6779: cauParcelasTexto()
6783: cauNext()
6790: dfCauFill()
6800: dfCauCalc()
6828: dfCauRead()
6841: expTypeName()
6845: driverFinVehicleId()
6857: cauEntradaItem()
6871: cauPagoDespesaItem()
6886: **CAUÇÃO: quanto já foi pago**
6888: cauStatus()
6898: obsResumoHtml()
6899: cauResumoHtml()
6904: **MULTAS E OUTRAS DESPESAS**
6905: multasOf()
6907: multaPagaAuto()
6912: multasAbertas()
6913: multasPendentes()
6914: multasResumoHtml()
6922: cobOf()
6923: dfCobFill()
6929: dfCobRead()
6932: dfCobInfo()
6942: cobResumoHtml()
6946: ajustesOf()
6950: ajusteVale()
6951: isoDia()
6953: vencProxima()
6954: previsaoProxima()
6968: previsaoHtml()
6972: dfAjRender()
6978: addAjuste()
6987: delAjuste()
6992: abrirAjustes()
6993: renderProxCobrancas()
6999: savePixExtra()
7007: dfMultFill()
7015: fdPaga()
7016: dfMultRender()
7025: toggleMultas()
7032: addMulta()
7042: delMulta()
7050: multaPaga()
7059: renderDriverExtras()
7087: mondayAfter()
7095: renderDriverProfileExtras()
7161: semanaDoPix()
7167: **MEUS RECIBOS (área do motorista)**
7169: meusRecibosLista()
7173: reciboRowHtml()
7181: renderEncerradoRecibos()
7186: openMeuReciboDireto()
7187: openMeusRecibos()
7194: closeMeusRecibos()
7195: reciboPdfHtml()
7206: verMeuRecibo()
7213: voltarMeusRecibos()
7214: pdfMeuRecibo()
7218: shareMeuRecibo()
7227: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
7228: editVehicleRent()
7245: nextParcel()
7251: fillNewPixValues()
7287: newPixParts()
7318: **PERÍODO E VENCIMENTO DA COBRANÇA**
7319: dataISO()
7320: dataDe()
7321: dataMais()
7322: dataBR()
7323: diasEntre()
7324: isoSP()
7325: pixPeriodo()
7332: pixDesc()
7333: pixDiasPeriodo()
7338: marcarAjustesPorVenc()
7343: pixDatasNovo()
7352: pixDatasMudou()
7363: pixAluguelProporcional()
7371: pixPeriodoInfo()
7384: pixAddLinha()
7391: pixLinhas()
7393: descSoma()
7403: calcNewPix()
7412: **RECIBO DE PAGAMENTO**
7416: receiptValue()
7417: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
7418: atrasoDados()
7422: cobrarAtraso()
7439: allocatePix()
7458: reciboData()
7481: fmtDateTimeBR()
7482: reciboTexto()
7533: openRecibo()
7550: closeRecibo()
7551: **CORRIGIR RECIBO**
7553: corrigirLinhaHtml()
7563: openCorrigirRecibo()
7586: closeCorrigirRecibo()
7587: corrigirLer()
7593: corrigirSoma()
7600: salvarCorrigirRecibo()
7617: copyRecibo()
7622: reciboCanvas()
7639: reciboPdfBlob()
7657: shareReciboPdf()
7673: rotularTabelas()
7691: areaAberta()
7692: markAreas()
7702: closeAreas()
7706: toggleArea()
7714: dobraSalva()
7715: setDobra()
7720: toggleDobra()
7727: dobraTopo()
7734: renderMasterResumo()
7748: renderMasterTopo()
7770: loadIA()
7792: updateIABadge()
7797: loadIASetting()
7803: paintIASwitch()
7809: toggleIA()
7816: loadRobo()
7825: iaPrepararQr()
7830: paintRobo()
7859: pedirCodigoRobo()
7868: toggleRobo()
7883: iaTodosGerar()
7901: iaTodosCancelar()
7905: iaTodosConfirmar()
7919: loadIARules()
7924: iaAbrirPdf()
7930: renderIARules()
7934: saveIARules()
7939: addIARule()
7944: delIARule()
7948: openIA()
7963: closeIA()
7964: iaShow()
7965: iaPhone()
7970: renderIA()
8012: iaAprovar()
8021: iaPhone2()
8022: iaSend()
8053: iaMark()
8064: iaDelete()
8075: openPixArea()
8084: closePixArea()
8085: renderPixArea()
8129: openEditPix()
8158: deletePix()
8170: closeNewPix()
8172: saveNewPix()
8263: pushSupported()
8264: isIOS()
8265: isStandalone()
8266: b64ToBytes()
8272: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
8277: notifStatus()
8285: stepsList()
8289: notifHelpHtml()
8323: renderNotifModal()
8335: checkDriverNotifications()
8368: activateFromModal()
8381: refreshNotifButton()
8400: subscribePush()
8415: enableNotifications()
8435: closeDocViewer()
8443: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
8455: allFeaturesOn()
8456: feat()
8457: loadDriverFeatures()
8464: saveDriverFeatures()
8469: drawFeatureToggles()
8484: setAllFeatures()
8495: applyDriverFeatures()
8510: **PIX: conferência do código e QR code desenhado no aparelho**
8511: crc16()
8519: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
8521: pixTxt()
8522: pixCampo()
8523: pixGerarCodigo()
8533: pixAutoLigado()
8534: pixAutoMudou()
8539: gerarPixAuto()
8555: pixRecebedorCarregar()
8566: pixRecebedorGuardar()
8573: pixValid()
8579: renderPixQr()
8589: previewNewPixQr()
8599: **FOTO DO MOTORISTA (recortada da CNH)**
8600: photoPath()
8601: fileToCanvas()
8620: cropPhoto()
8634: savePhoto()
8639: photoBoxFrom()
8645: fillAvatar()
8656: fillAvatars()
8669: storedFile()
8676: photoFromCnh()
8688: **FOTO DO PERFIL ACOMPANHA A CNH**
8691: cnhStamp()
8692: photoFiles()
8700: avatarPath()
8705: syncCnhPhotos()
8729: pickImage()
8732: changeDriverPhoto()
8748: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
8750: uploadTmp()
8757: clearTmp()
8762: aiReadFiles()
8768: okDateISO()
8770: noAccents()
8772: makeUsername()
8781: titleCase()
8782: syncNewDriverAccess()
8788: setNewDriverPhoto()
8793: pickNewDriverPhoto()
8797: resetNewDriverForm()
8805: newDriverDocChosen()
8839: anoCrlv()
8843: formatVehicleBrand()
8848: inferVehicleBrand()
8857: normalizeCrlvFields()
8876: applyCrlvFields()
8889: aiReadCrlv()
8903: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
8904: sendWelcomeEmail()
8910: showCredentials()
8921: demoAssistente()
8940: **PERGUNTAR À IA (ÁREA IA, só o master)**
8944: iaChatReset()
8945: iaNorm()
8946: iaAcha()
8952: iaVeicTxt()
8953: iaCamposVeic()
8954: iaDataOk()
8955: iaOpcoes()
8956: iaTodosMotoristas()
8960: iaFerramenta()
9055: renderIAChat()
9072: iaChatDica()
9073: iaChatEnviar()
9108: iaChatNota()
9109: iaCancelarCartao()
9110: iaConfirmarCartao()
9155: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
9156: syncAppFinState()
9165: renderAppEarnings()
9245: saveAppEarning()
9272: workDayISO()
9273: paintDayOff()
9282: renderDayOff()
9289: setDayOff()
9299: aiReadEarning()
9332: **DESPESAS DO APLICATIVO**
9334: appExpCustomTypes()
9335: fillAppExpTypes()
9342: onAppExpTypeChange()
9347: saveAppExpense()
9372: deleteAppExpense()
9381: deleteAppEarning()
9478: loadTermsAcceptances()
9490: termsOf()
9491: currentAcceptance()
9492: needsTermsAcceptance()
9495: fmtDateTime()
9498: termsPlainText()
9502: termsHash()
9510: openTermsGate()
9533: termsGateCheck()
9541: acceptTerms()
9561: acceptanceHtml()
9572: openTermsViewer()
9590: closeTerms()
9596: downloadTermsCopy()
9617: termsBadgeMaster()
9624: termsMasterDetail()
9665: renderTermsSetupBanner()
9678: copyTermsSql()
9688: cnhExpired()
9689: cnhWaiting()
9690: onlyDigits()
9691: normName()
9693: verifyCnh()
9705: renderCnhBanner()
9723: sendNewCnh()
9771: cnhBadgeMaster()
9779: applyPendingCnh()
9787: autoReadNewCnhs()
9805: cnhPendingHtml()
9819: recheckPendingCnh()
9829: rejectPendingCnh()
9839: showContractDoc()
9939: contractPeriodLabel()
9940: contractStatusBadge()
9944: pdfSafeText()
9956: contractPdfFileName()
9965: cwBuildDepositChargeText()
10002: cwBuildDepositClauseText()
10014: buildDefaultClauses()
10066: generateContractPdfBytes()
10085: drawHeader()
10090: newPage()
10097: ensureSpace()
10100: wrapLines()
10124: drawJustifiedLine()
10237: renderContractsTab()
10291: renderDriverRentalContractsBox()
10350: openContractForDriver()
10357: *WIZARD DE CRIAÇÃO / EDIÇÃO DE RASCUNHO / RENOVAÇÃO*
10359: closeContractWizard()
10360: cwPopulateSelects()
10368: cwPopulateLocadores()
10380: cwOnLocadorChange()
10389: defaultWitness1ForLocador()
10397: cwApplyDefaultWitness1()
10410: cwFillLocador()
10418: cwFillDepositFromDriver()
10446: cwFillDepositFromComercial()
10468: cwSyncClauseIdx()
10477: cwSyncDepositClauseOnly()
10478: cwUpdateTrialPreview()
10494: cwDepCalc()
10539: cwFillDriver()
10557: cwUpdateCrlvBar()
10566: cwNeedsCrlvFill()
10570: cwRefreshMissingBoxIfVisible()
10579: cwReadVehicleCrlv()
10628: cwReadCurrentVehicleCrlv()
10634: cwFillVehicle()
10656: cwOnDriverChange()
10664: cwOnVehicleChange()
10675: cwReadSnapshot()
10718: cwRenderClausesEditor()
10728: cwRebuildClauses()
10736: cwRenderPreview()
10766: cwTogglePreview()
10771: validateContractForEmission()
10788: openContractWizard()
10895: cwSyncSources()
10935: logContractHistory()
10944: persistContract()
11032: saveContractDraft()
11033: emitContract()
11035: ensureContractPdfBlob()
11045: downloadContractPdf()
11057: printContractPdf()
11070: *MODAL DETALHE, ASSINATURAS, UPLOAD ASSINADO, RENOVAR, ENCERRAR, CANCELAR*
11071: closeContractDetail()
11072: openContractDetail()
11141: saveContractSignatures()
11166: uploadSignedContractFile()
11186: terminateContractPrompt()
11201: cancelContractPrompt()
11241: inspectionTypeBadge()
11245: inspectionStatusBadge()
11249: inspectionPdfFileName()
11256: switchContractsSubtab()
11269: renderInspectionsTab()
11329: *ANALISADOR DE IA EM LOTE + CONFIRMAÇÃO PRESENCIAL DE DANOS*
11330: runInspectionBatchAI()
11353: promptInspectionDamageConfirmation()
11431: processInspectionPhotosWithAI()
11487: analyzeSavedInspectionPhotos()
11503: renameInspectionPhoto()
11519: *WIZARD DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO)*
11522: closeInspectionWizard()
11523: openInspectionWizard()
11584: iwCollectSavedPhotosFor()
11617: iwPopulateContractsAndBase()
11632: iwSyncHeaderAndLegal()
11644: iwOnTypeChange()
11650: iwOnVehicleChange()
11663: iwOnDriverChange()
11668: iwOnContractChange()
11675: iwImportSavedPhotos()
11686: iwUploadPhotos()
11739: iwRunAIOnList()
11765: iwAnalyzeWithAI()
11772: iwRenderPhotos()
11810: iwUpdatePhotoField()
11815: iwUpdatePhotoDamage()
11823: iwRemovePhoto()
11829: iwRenderDamagesSummary()
11844: iwRenderComparison()
11863: iwRenderChecklist()
11882: persistInspectionTerm()
11973: saveInspectionDraft()
11974: emitInspectionTerm()
11976: *GERADOR DE PDF A4 DE VISTORIA E DEVOLUÇÃO (com grid real de fotos)*
11977: blobToEmbeddableJpeg()
12006: generateInspectionPdfBytes()
12190: ensureInspectionPdfBlob()
12199: downloadInspectionPdf()
12211: printInspectionPdf()
12224: *MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA*
12225: closeInspectionDetail()
12226: openInspectionDetail()
12283: saveInspectionSignatures()
12307: uploadSignedInspectionFile()
12327: cancelInspectionPrompt()

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
