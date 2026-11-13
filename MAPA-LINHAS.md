# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 12/11/2026, 23:31:28. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (12045 linhas)

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
1814: <!-- Cláusulas editáveis -->
1826: <!-- Prévia -->
1840: <!-- MODAL DETALHE, ASSINATURAS E HISTÓRICO DO CONTRATO -->
1841: #modalContractDetail
1854: <!-- MODAL GERADOR DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO) -->
1855: #modalInspectionTerm
1916: <!-- Fotos da vistoria (lote + reuso + análise IA + confirmação obrigatória de avarias) -->
1939: <!-- Resumo de Avarias Confirmadas + Checklist Bilateral + Ressalvas -->
1966: <!-- MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA -->
1967: #modalInspectionTermDetail
1980: <!-- MODAL CONFIRMAÇÃO DE DANO DETECTADO PELA IA (OBRIGATÓRIO ANTES DE NOMEAR) -->
1981: #modalInspDamageConfirm
1996: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
1997: #modalDocViewer
2005: #modalDocBody
2006: <!-- Conteúdo pré-visualizado -->
2012: #modalTerms
2026: <!-- NOTIFICAÇÕES TOAST -->
2043: lsGet()
2044: lsSet()
2045: lsDel()
2068: demoLoginRole()
2072: demoId()
2073: demoSave()
2074: demoSaved()
2076: *datas no horário de Brasília*
2077: demoLocal()
2078: demoParts()
2079: demoDay()
2080: demoNextDue()
2085: *dados fictícios (4 meses)*
2086: demoBuild()
2304: *documentos fictícios (imagem gerada na hora)*
2305: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
2306: demoDocBlob()
2384: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
2385: demoQuery()
2408: out()
2414: run()
2455: demoOnUpdate()
2465: demoOnInsert()
2577: demoClient()
2667: demoStart()
2675: demoStop()
2681: abrirDemo()
2688: trocarDemo()
2693: demoBanner()
2708: toEmail()
2712: showLogin()
2716: esc()
2721: dataHoraBR()
2729: uiDialogo()
2777: uiConfirm()
2786: uiPrompt()
2792: friendlyError()
2802: devicePrefs()
2805: saveDevicePrefs()
2808: docRef()
2809: viewDocIdx()
2811: setBusy()
2849: **TEMAS**
2858: currentTheme()
2863: applyTheme()
2864: openThemes()
2874: pickTheme()
2880: toggleDarkMode()
2882: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
2884: loadDesignCfg()
2891: applyDesign()
2908: markMasterNav()
2915: fillDesignCfg()
2920: saveDesign()
2934: showToast()
2943: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
2944: senhaErro()
2945: abrirSenha()
2954: salvarIaCodigo()
2964: fecharSenha()
2965: salvarSenha()
2986: loginUserInput()
2991: loginErro()
2995: verSenha()
3000: handleLogin()
3049: logout()
3068: saveFirstLoginPreferences()
3091: carregarDados()
3123: aplicarDados()
3164: loadAndRender()
3191: autoRefresh()
3230: markUpdated()
3235: reload()
3240: renderApp()
3288: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
3291: masterBack()
3293: viewAsDriver()
3315: exitViewAs()
3334: viewOnly()
3335: renderViewAsBanner()
3345: showSection()
3350: withBtn()
3358: toggleDriverStatus()
3367: isOnline()
3369: updateStatusToggleUI()
3382: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
3391: checkApkUpdate()
3406: updateInstallApkButton()
3426: renderDriverPanel()
3684: switchDriverTab()
3699: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
3702: parsePixKey()
3706: normalizePixKey()
3714: pixKeyLooksOk()
3722: togglePixKeyFields()
3728: updatePixKeyPlaceholder()
3734: copyPixKey()
3741: copyPixCode()
3753: receiptBadge()
3763: receiptMasterBox()
3790: receiptAction()
3797: confirmReceipt()
3826: rejectReceipt()
3838: recheckReceipt()
3847: uploadReceipt()
3870: switchMasterTab()
3889: maskPhone()
3898: waLink()
3903: allVeh()
3904: allDrv()
3905: chargeVehicleId()
3917: enviarPedidoParcialAsaas()
3933: pedirPixParcial()
3951: restaurarPixTotal()
3957: responderPixParcial()
3981: contrato30Info()
4011: encerrarContrato()
4028: encerrarContratoPrompt()
4041: reativarContrato()
4065: marcarCaucaoPagoArquivar()
4086: desarquivarFicha()
4104: deliveryInspectionHtml()
4143: uploadDeliveryPhotos()
4170: delDeliveryPhoto()
4188: addCauDesconto()
4213: puxarMultaCaucao()
4234: delCauDesconto()
4256: dfCauDescontosHtml()
4289: dfContratoRender()
4333: encerrarContratoConfirmFicha()
4340: renderMasterPanel()
4504: renderArchivedDrivers()
4549: handleAddVehicle()
4589: deleteVehicle()
4590: cancelDeleteVehicle()
4592: confirmDeleteVehicle()
4616: abrirEditarVeiculo()
4638: evReadStoredCrlv()
4663: evReadChosenCrlv()
4679: fecharEditarVeiculo()
4680: salvarEditarVeiculo()
4717: drvCauMostra()
4724: drvCauLer()
4732: handleAddDriver()
4810: marcarSituacao()
4820: updateDriverPaymentStatus()
4829: deleteDriver()
4830: cancelDeleteDriver()
4832: confirmDeleteDriver()
4855: prepareFile()
4877: uploadFile()
4888: fileUrl()
4899: downloadName()
4903: renderFilePreview()
4923: renderPdfToCanvas()
4950: viewDoc()
4971: **DINHEIRO**
4972: parseMoney()
4979: fmtMoney()
4980: fmtDate()
4981: todayISO()
4983: **CONFIGURAÇÕES (Gemini e Google Drive)**
4985: loadConfigStatus()
4990: paintConfig()
4995: fillOwnerVehicleSelect()
5001: saveOwnerVehicle()
5023: locadorMerged()
5036: getLocadoresList()
5050: locadorForVehicle()
5059: fillLocadorSettings()
5079: cfgOnLocadorChange()
5080: upsertLocadorInList()
5110: deleteLocadorSetting()
5126: saveLocadorSettings()
5154: openSettings()
5169: closeSettings()
5170: saveConfig()
5180: **ASAAS (Financeiro: chave por motorista ativo + Config: conta API)**
5181: renderAsaasDrivers()
5208: toggleDriverAsaas()
5240: getAtrasoCfg()
5244: fillAtrasoCfg()
5251: saveAtrasoCfg()
5268: atrasoDataBR()
5273: atrasoPrazoUtil()
5280: calcEncargosAtraso()
5299: ehLinhaEncargo()
5300: calcAtrasoMotorista()
5330: atualizarPixAtraso()
5343: loadAsaasInfo()
5357: saveAsaas()
5365: testarAsaas()
5372: copiarAsaas()
5376: testDrive()
5383: resyncDrive()
5391: **FICHA DO MOTORISTA**
5394: openDriverFile()
5426: closeDriverFile()
5428: saveDriverFile()
5493: aiFillDriver()
5532: **CONTROLE FINANCEIRO**
5533: finRange()
5550: dayBR()
5551: inRange()
5553: onFinPeriodChange()
5559: fillFinFilters()
5567: clearFinFilters()
5571: updateFinFilterCount()
5580: openFinance()
5586: switchFinTab()
5597: finCardBtn()
5605: closeFinCardDetail()
5606: closeFinance()
5608: collectRentFinData()
5659: renderFinance()
5717: openFinCardDetail()
5924: openFinExtrato()
6018: renderFinExtratoView()
6099: openFinExtratoReport()
6116: renderFinGrafico()
6136: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
6138: okEmail()
6140: openEmailCompose()
6161: closeEmailCompose()
6162: sendEmailCompose()
6177: emailRecibo()
6182: emailIA()
6190: **RELATÓRIO DO FINANCEIRO**
6192: finFiltersText()
6197: finPeriodText()
6204: buildReportHtml()
6226: openFinReport()
6236: closeFinReport()
6237: printFinReport()
6241: shareFinReport()
6251: emailFinReport()
6257: **DESPESAS DO VEÍCULO**
6259: openExpenses()
6271: closeExpenses()
6272: fillExpenseTypes()
6277: createExpenseType()
6292: aiReadExpense()
6324: renderExpenses()
6346: saveExpense()
6373: deleteExpense()
6402: inspSlotLabel()
6405: photoDamageBadge()
6414: photoCard()
6452: inspectionHtml()
6499: hydrateImages()
6505: openInspection()
6513: closeInspection()
6517: renderInspectionModal()
6524: uploadInspection()
6573: deleteInspectionPhoto()
6593: fmtDue()
6599: nextDueLocal()
6610: openNewPix()
6640: **CAUÇÃO DO MOTORISTA**
6641: cauOf()
6642: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
6643: devOf()
6644: devCobrancas()
6646: devPrevisao()
6654: dfDevRender()
6681: dfDevIr()
6682: dfDevSalvar()
6687: dfDevAvisar()
6693: dfDevDesfazer()
6697: dfDevReceber()
6706: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
6710: cauPlano()
6718: cauParcela()
6725: cauParcelasTexto()
6729: cauNext()
6736: dfCauFill()
6746: dfCauCalc()
6774: dfCauRead()
6787: expTypeName()
6791: driverFinVehicleId()
6803: cauEntradaItem()
6817: cauPagoDespesaItem()
6832: **CAUÇÃO: quanto já foi pago**
6834: cauStatus()
6844: obsResumoHtml()
6845: cauResumoHtml()
6850: **MULTAS E OUTRAS DESPESAS**
6851: multasOf()
6853: multaPagaAuto()
6858: multasAbertas()
6859: multasPendentes()
6860: multasResumoHtml()
6868: cobOf()
6869: dfCobFill()
6875: dfCobRead()
6878: dfCobInfo()
6888: cobResumoHtml()
6892: ajustesOf()
6896: ajusteVale()
6897: isoDia()
6899: vencProxima()
6900: previsaoProxima()
6914: previsaoHtml()
6918: dfAjRender()
6924: addAjuste()
6933: delAjuste()
6938: abrirAjustes()
6939: renderProxCobrancas()
6945: savePixExtra()
6953: dfMultFill()
6961: fdPaga()
6962: dfMultRender()
6971: toggleMultas()
6978: addMulta()
6988: delMulta()
6996: multaPaga()
7005: renderDriverExtras()
7033: mondayAfter()
7041: renderDriverProfileExtras()
7107: semanaDoPix()
7113: **MEUS RECIBOS (área do motorista)**
7115: meusRecibosLista()
7119: reciboRowHtml()
7127: renderEncerradoRecibos()
7132: openMeuReciboDireto()
7133: openMeusRecibos()
7140: closeMeusRecibos()
7141: reciboPdfHtml()
7152: verMeuRecibo()
7159: voltarMeusRecibos()
7160: pdfMeuRecibo()
7164: shareMeuRecibo()
7173: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
7174: editVehicleRent()
7191: nextParcel()
7197: fillNewPixValues()
7233: newPixParts()
7264: **PERÍODO E VENCIMENTO DA COBRANÇA**
7265: dataISO()
7266: dataDe()
7267: dataMais()
7268: dataBR()
7269: diasEntre()
7270: isoSP()
7271: pixPeriodo()
7278: pixDesc()
7279: pixDiasPeriodo()
7284: marcarAjustesPorVenc()
7289: pixDatasNovo()
7298: pixDatasMudou()
7309: pixAluguelProporcional()
7317: pixPeriodoInfo()
7330: pixAddLinha()
7337: pixLinhas()
7339: descSoma()
7349: calcNewPix()
7358: **RECIBO DE PAGAMENTO**
7362: receiptValue()
7363: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
7364: atrasoDados()
7368: cobrarAtraso()
7385: allocatePix()
7404: reciboData()
7427: fmtDateTimeBR()
7428: reciboTexto()
7479: openRecibo()
7496: closeRecibo()
7497: **CORRIGIR RECIBO**
7499: corrigirLinhaHtml()
7509: openCorrigirRecibo()
7532: closeCorrigirRecibo()
7533: corrigirLer()
7539: corrigirSoma()
7546: salvarCorrigirRecibo()
7563: copyRecibo()
7568: reciboCanvas()
7585: reciboPdfBlob()
7603: shareReciboPdf()
7619: rotularTabelas()
7637: areaAberta()
7638: markAreas()
7648: closeAreas()
7652: toggleArea()
7660: dobraSalva()
7661: setDobra()
7666: toggleDobra()
7673: dobraTopo()
7680: renderMasterResumo()
7694: renderMasterTopo()
7716: loadIA()
7738: updateIABadge()
7743: loadIASetting()
7749: paintIASwitch()
7755: toggleIA()
7762: loadRobo()
7771: iaPrepararQr()
7776: paintRobo()
7805: pedirCodigoRobo()
7814: toggleRobo()
7829: iaTodosGerar()
7847: iaTodosCancelar()
7851: iaTodosConfirmar()
7865: loadIARules()
7870: iaAbrirPdf()
7876: renderIARules()
7880: saveIARules()
7885: addIARule()
7890: delIARule()
7894: openIA()
7909: closeIA()
7910: iaShow()
7911: iaPhone()
7916: renderIA()
7958: iaAprovar()
7967: iaPhone2()
7968: iaSend()
7999: iaMark()
8010: iaDelete()
8021: openPixArea()
8030: closePixArea()
8031: renderPixArea()
8075: openEditPix()
8104: deletePix()
8116: closeNewPix()
8118: saveNewPix()
8209: pushSupported()
8210: isIOS()
8211: isStandalone()
8212: b64ToBytes()
8218: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
8223: notifStatus()
8231: stepsList()
8235: notifHelpHtml()
8269: renderNotifModal()
8281: checkDriverNotifications()
8314: activateFromModal()
8327: refreshNotifButton()
8346: subscribePush()
8361: enableNotifications()
8381: closeDocViewer()
8389: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
8401: allFeaturesOn()
8402: feat()
8403: loadDriverFeatures()
8410: saveDriverFeatures()
8415: drawFeatureToggles()
8430: setAllFeatures()
8441: applyDriverFeatures()
8456: **PIX: conferência do código e QR code desenhado no aparelho**
8457: crc16()
8465: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
8467: pixTxt()
8468: pixCampo()
8469: pixGerarCodigo()
8479: pixAutoLigado()
8480: pixAutoMudou()
8485: gerarPixAuto()
8501: pixRecebedorCarregar()
8512: pixRecebedorGuardar()
8519: pixValid()
8525: renderPixQr()
8535: previewNewPixQr()
8545: **FOTO DO MOTORISTA (recortada da CNH)**
8546: photoPath()
8547: fileToCanvas()
8566: cropPhoto()
8580: savePhoto()
8585: photoBoxFrom()
8591: fillAvatar()
8602: fillAvatars()
8615: storedFile()
8622: photoFromCnh()
8634: **FOTO DO PERFIL ACOMPANHA A CNH**
8637: cnhStamp()
8638: photoFiles()
8646: avatarPath()
8651: syncCnhPhotos()
8675: pickImage()
8678: changeDriverPhoto()
8694: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
8696: uploadTmp()
8703: clearTmp()
8708: aiReadFiles()
8714: okDateISO()
8716: noAccents()
8718: makeUsername()
8727: titleCase()
8728: syncNewDriverAccess()
8734: setNewDriverPhoto()
8739: pickNewDriverPhoto()
8743: resetNewDriverForm()
8751: newDriverDocChosen()
8785: anoCrlv()
8789: formatVehicleBrand()
8794: inferVehicleBrand()
8803: normalizeCrlvFields()
8822: applyCrlvFields()
8835: aiReadCrlv()
8849: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
8850: sendWelcomeEmail()
8856: showCredentials()
8867: demoAssistente()
8886: **PERGUNTAR À IA (ÁREA IA, só o master)**
8890: iaChatReset()
8891: iaNorm()
8892: iaAcha()
8898: iaVeicTxt()
8899: iaCamposVeic()
8900: iaDataOk()
8901: iaOpcoes()
8902: iaTodosMotoristas()
8906: iaFerramenta()
9001: renderIAChat()
9018: iaChatDica()
9019: iaChatEnviar()
9054: iaChatNota()
9055: iaCancelarCartao()
9056: iaConfirmarCartao()
9101: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
9102: syncAppFinState()
9111: renderAppEarnings()
9191: saveAppEarning()
9218: workDayISO()
9219: paintDayOff()
9228: renderDayOff()
9235: setDayOff()
9245: aiReadEarning()
9278: **DESPESAS DO APLICATIVO**
9280: appExpCustomTypes()
9281: fillAppExpTypes()
9288: onAppExpTypeChange()
9293: saveAppExpense()
9318: deleteAppExpense()
9327: deleteAppEarning()
9424: loadTermsAcceptances()
9436: termsOf()
9437: currentAcceptance()
9438: needsTermsAcceptance()
9441: fmtDateTime()
9444: termsPlainText()
9448: termsHash()
9456: openTermsGate()
9479: termsGateCheck()
9487: acceptTerms()
9507: acceptanceHtml()
9518: openTermsViewer()
9536: closeTerms()
9542: downloadTermsCopy()
9563: termsBadgeMaster()
9570: termsMasterDetail()
9611: renderTermsSetupBanner()
9624: copyTermsSql()
9634: cnhExpired()
9635: cnhWaiting()
9636: onlyDigits()
9637: normName()
9639: verifyCnh()
9651: renderCnhBanner()
9669: sendNewCnh()
9717: cnhBadgeMaster()
9725: applyPendingCnh()
9733: autoReadNewCnhs()
9751: cnhPendingHtml()
9765: recheckPendingCnh()
9775: rejectPendingCnh()
9785: showContractDoc()
9885: contractPeriodLabel()
9886: contractStatusBadge()
9890: pdfSafeText()
9902: contractPdfFileName()
9911: buildDefaultClauses()
9958: generateContractPdfBytes()
9977: drawHeader()
9982: newPage()
9989: ensureSpace()
9992: wrapLines()
10016: drawJustifiedLine()
10129: renderContractsTab()
10183: renderDriverRentalContractsBox()
10242: openContractForDriver()
10249: *WIZARD DE CRIAÇÃO / EDIÇÃO DE RASCUNHO / RENOVAÇÃO*
10251: closeContractWizard()
10252: cwPopulateSelects()
10260: cwPopulateLocadores()
10272: cwOnLocadorChange()
10281: cwFillLocador()
10288: cwFillDriver()
10304: cwUpdateCrlvBar()
10313: cwNeedsCrlvFill()
10317: cwRefreshMissingBoxIfVisible()
10326: cwReadVehicleCrlv()
10375: cwReadCurrentVehicleCrlv()
10381: cwFillVehicle()
10403: cwOnDriverChange()
10411: cwOnVehicleChange()
10422: cwReadSnapshot()
10448: cwRenderClausesEditor()
10458: cwRebuildClauses()
10466: cwRenderPreview()
10495: cwTogglePreview()
10500: validateContractForEmission()
10517: openContractWizard()
10606: cwSyncSources()
10646: logContractHistory()
10655: persistContract()
10743: saveContractDraft()
10744: emitContract()
10746: ensureContractPdfBlob()
10756: downloadContractPdf()
10768: printContractPdf()
10781: *MODAL DETALHE, ASSINATURAS, UPLOAD ASSINADO, RENOVAR, ENCERRAR, CANCELAR*
10782: closeContractDetail()
10783: openContractDetail()
10852: saveContractSignatures()
10877: uploadSignedContractFile()
10897: terminateContractPrompt()
10912: cancelContractPrompt()
10952: inspectionTypeBadge()
10956: inspectionStatusBadge()
10960: inspectionPdfFileName()
10967: switchContractsSubtab()
10980: renderInspectionsTab()
11040: *ANALISADOR DE IA EM LOTE + CONFIRMAÇÃO PRESENCIAL DE DANOS*
11041: runInspectionBatchAI()
11064: promptInspectionDamageConfirmation()
11142: processInspectionPhotosWithAI()
11197: analyzeSavedInspectionPhotos()
11213: renameInspectionPhoto()
11229: *WIZARD DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO)*
11232: closeInspectionWizard()
11233: openInspectionWizard()
11294: iwCollectSavedPhotosFor()
11327: iwPopulateContractsAndBase()
11342: iwSyncHeaderAndLegal()
11354: iwOnTypeChange()
11360: iwOnVehicleChange()
11373: iwOnDriverChange()
11378: iwOnContractChange()
11385: iwImportSavedPhotos()
11396: iwUploadPhotos()
11440: iwRunAIOnList()
11466: iwAnalyzeWithAI()
11473: iwRenderPhotos()
11511: iwUpdatePhotoField()
11516: iwUpdatePhotoDamage()
11524: iwRemovePhoto()
11530: iwRenderDamagesSummary()
11545: iwRenderComparison()
11564: iwRenderChecklist()
11583: persistInspectionTerm()
11674: saveInspectionDraft()
11675: emitInspectionTerm()
11677: *GERADOR DE PDF A4 DE VISTORIA E DEVOLUÇÃO (com grid real de fotos)*
11678: blobToEmbeddableJpeg()
11707: generateInspectionPdfBytes()
11891: ensureInspectionPdfBlob()
11900: downloadInspectionPdf()
11912: printInspectionPdf()
11925: *MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA*
11926: closeInspectionDetail()
11927: openInspectionDetail()
11984: saveInspectionSignatures()
12008: uploadSignedInspectionFile()
12028: cancelInspectionPrompt()

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
