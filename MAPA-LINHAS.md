# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 12/11/2026, 23:47:29. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (12244 linhas)

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
1840: <!-- Cláusulas editáveis -->
1852: <!-- Prévia -->
1866: <!-- MODAL DETALHE, ASSINATURAS E HISTÓRICO DO CONTRATO -->
1867: #modalContractDetail
1880: <!-- MODAL GERADOR DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO) -->
1881: #modalInspectionTerm
1942: <!-- Fotos da vistoria (lote + reuso + análise IA + confirmação obrigatória de avarias) -->
1965: <!-- Resumo de Avarias Confirmadas + Checklist Bilateral + Ressalvas -->
1992: <!-- MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA -->
1993: #modalInspectionTermDetail
2006: <!-- MODAL CONFIRMAÇÃO DE DANO DETECTADO PELA IA (OBRIGATÓRIO ANTES DE NOMEAR) -->
2007: #modalInspDamageConfirm
2022: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
2023: #modalDocViewer
2031: #modalDocBody
2032: <!-- Conteúdo pré-visualizado -->
2038: #modalTerms
2052: <!-- NOTIFICAÇÕES TOAST -->
2069: lsGet()
2070: lsSet()
2071: lsDel()
2094: demoLoginRole()
2098: demoId()
2099: demoSave()
2100: demoSaved()
2102: *datas no horário de Brasília*
2103: demoLocal()
2104: demoParts()
2105: demoDay()
2106: demoNextDue()
2111: *dados fictícios (4 meses)*
2112: demoBuild()
2330: *documentos fictícios (imagem gerada na hora)*
2331: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
2332: demoDocBlob()
2410: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
2411: demoQuery()
2434: out()
2440: run()
2481: demoOnUpdate()
2491: demoOnInsert()
2603: demoClient()
2693: demoStart()
2701: demoStop()
2707: abrirDemo()
2714: trocarDemo()
2719: demoBanner()
2734: toEmail()
2738: showLogin()
2742: esc()
2747: dataHoraBR()
2755: uiDialogo()
2803: uiConfirm()
2812: uiPrompt()
2818: friendlyError()
2828: devicePrefs()
2831: saveDevicePrefs()
2834: docRef()
2835: viewDocIdx()
2837: setBusy()
2875: **TEMAS**
2884: currentTheme()
2889: applyTheme()
2890: openThemes()
2900: pickTheme()
2906: toggleDarkMode()
2908: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
2910: loadDesignCfg()
2917: applyDesign()
2934: markMasterNav()
2941: fillDesignCfg()
2946: saveDesign()
2960: showToast()
2969: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
2970: senhaErro()
2971: abrirSenha()
2980: salvarIaCodigo()
2990: fecharSenha()
2991: salvarSenha()
3012: loginUserInput()
3017: loginErro()
3021: verSenha()
3026: handleLogin()
3075: logout()
3094: saveFirstLoginPreferences()
3117: carregarDados()
3149: aplicarDados()
3190: loadAndRender()
3217: autoRefresh()
3256: markUpdated()
3261: reload()
3266: renderApp()
3314: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
3317: masterBack()
3319: viewAsDriver()
3341: exitViewAs()
3360: viewOnly()
3361: renderViewAsBanner()
3371: showSection()
3376: withBtn()
3384: toggleDriverStatus()
3393: isOnline()
3395: updateStatusToggleUI()
3408: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
3417: checkApkUpdate()
3432: updateInstallApkButton()
3452: renderDriverPanel()
3710: switchDriverTab()
3725: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
3728: parsePixKey()
3732: normalizePixKey()
3740: pixKeyLooksOk()
3748: togglePixKeyFields()
3754: updatePixKeyPlaceholder()
3760: copyPixKey()
3767: copyPixCode()
3779: receiptBadge()
3789: receiptMasterBox()
3816: receiptAction()
3823: confirmReceipt()
3852: rejectReceipt()
3864: recheckReceipt()
3873: uploadReceipt()
3896: switchMasterTab()
3915: maskPhone()
3924: waLink()
3929: allVeh()
3930: allDrv()
3931: chargeVehicleId()
3943: enviarPedidoParcialAsaas()
3959: pedirPixParcial()
3977: restaurarPixTotal()
3983: responderPixParcial()
4007: contrato30Info()
4037: encerrarContrato()
4054: encerrarContratoPrompt()
4067: reativarContrato()
4091: marcarCaucaoPagoArquivar()
4112: desarquivarFicha()
4130: deliveryInspectionHtml()
4169: uploadDeliveryPhotos()
4196: delDeliveryPhoto()
4214: addCauDesconto()
4239: puxarMultaCaucao()
4260: delCauDesconto()
4282: dfCauDescontosHtml()
4315: dfContratoRender()
4359: encerrarContratoConfirmFicha()
4366: renderMasterPanel()
4530: renderArchivedDrivers()
4575: handleAddVehicle()
4615: deleteVehicle()
4616: cancelDeleteVehicle()
4618: confirmDeleteVehicle()
4642: abrirEditarVeiculo()
4664: evReadStoredCrlv()
4689: evReadChosenCrlv()
4705: fecharEditarVeiculo()
4706: salvarEditarVeiculo()
4743: drvCauMostra()
4750: drvCauLer()
4758: handleAddDriver()
4836: marcarSituacao()
4846: updateDriverPaymentStatus()
4855: deleteDriver()
4856: cancelDeleteDriver()
4858: confirmDeleteDriver()
4881: prepareFile()
4903: uploadFile()
4914: fileUrl()
4925: downloadName()
4929: renderFilePreview()
4949: renderPdfToCanvas()
4976: viewDoc()
4997: **DINHEIRO**
4998: parseMoney()
5005: fmtMoney()
5006: fmtDate()
5007: todayISO()
5009: **CONFIGURAÇÕES (Gemini e Google Drive)**
5011: loadConfigStatus()
5016: paintConfig()
5021: fillOwnerVehicleSelect()
5027: saveOwnerVehicle()
5049: locadorMerged()
5062: getLocadoresList()
5076: locadorForVehicle()
5085: fillLocadorSettings()
5105: cfgOnLocadorChange()
5106: upsertLocadorInList()
5136: deleteLocadorSetting()
5152: saveLocadorSettings()
5180: openSettings()
5195: closeSettings()
5196: saveConfig()
5206: **ASAAS (Financeiro: chave por motorista ativo + Config: conta API)**
5207: renderAsaasDrivers()
5234: toggleDriverAsaas()
5266: getAtrasoCfg()
5270: fillAtrasoCfg()
5277: saveAtrasoCfg()
5294: atrasoDataBR()
5299: atrasoPrazoUtil()
5306: calcEncargosAtraso()
5325: ehLinhaEncargo()
5326: calcAtrasoMotorista()
5356: atualizarPixAtraso()
5369: loadAsaasInfo()
5383: saveAsaas()
5391: testarAsaas()
5398: copiarAsaas()
5402: testDrive()
5409: resyncDrive()
5417: **FICHA DO MOTORISTA**
5420: openDriverFile()
5452: closeDriverFile()
5454: saveDriverFile()
5519: aiFillDriver()
5558: **CONTROLE FINANCEIRO**
5559: finRange()
5576: dayBR()
5577: inRange()
5579: onFinPeriodChange()
5585: fillFinFilters()
5593: clearFinFilters()
5597: updateFinFilterCount()
5606: openFinance()
5612: switchFinTab()
5623: finCardBtn()
5631: closeFinCardDetail()
5632: closeFinance()
5634: collectRentFinData()
5685: renderFinance()
5743: openFinCardDetail()
5950: openFinExtrato()
6044: renderFinExtratoView()
6125: openFinExtratoReport()
6142: renderFinGrafico()
6162: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
6164: okEmail()
6166: openEmailCompose()
6187: closeEmailCompose()
6188: sendEmailCompose()
6203: emailRecibo()
6208: emailIA()
6216: **RELATÓRIO DO FINANCEIRO**
6218: finFiltersText()
6223: finPeriodText()
6230: buildReportHtml()
6252: openFinReport()
6262: closeFinReport()
6263: printFinReport()
6267: shareFinReport()
6277: emailFinReport()
6283: **DESPESAS DO VEÍCULO**
6285: openExpenses()
6297: closeExpenses()
6298: fillExpenseTypes()
6303: createExpenseType()
6318: aiReadExpense()
6350: renderExpenses()
6372: saveExpense()
6399: deleteExpense()
6428: inspSlotLabel()
6431: photoDamageBadge()
6440: photoCard()
6478: inspectionHtml()
6525: hydrateImages()
6531: openInspection()
6539: closeInspection()
6543: renderInspectionModal()
6550: uploadInspection()
6599: deleteInspectionPhoto()
6619: fmtDue()
6625: nextDueLocal()
6636: openNewPix()
6666: **CAUÇÃO DO MOTORISTA**
6667: cauOf()
6668: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
6669: devOf()
6670: devCobrancas()
6672: devPrevisao()
6680: dfDevRender()
6707: dfDevIr()
6708: dfDevSalvar()
6713: dfDevAvisar()
6719: dfDevDesfazer()
6723: dfDevReceber()
6732: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
6736: cauPlano()
6744: cauParcela()
6751: cauParcelasTexto()
6755: cauNext()
6762: dfCauFill()
6772: dfCauCalc()
6800: dfCauRead()
6813: expTypeName()
6817: driverFinVehicleId()
6829: cauEntradaItem()
6843: cauPagoDespesaItem()
6858: **CAUÇÃO: quanto já foi pago**
6860: cauStatus()
6870: obsResumoHtml()
6871: cauResumoHtml()
6876: **MULTAS E OUTRAS DESPESAS**
6877: multasOf()
6879: multaPagaAuto()
6884: multasAbertas()
6885: multasPendentes()
6886: multasResumoHtml()
6894: cobOf()
6895: dfCobFill()
6901: dfCobRead()
6904: dfCobInfo()
6914: cobResumoHtml()
6918: ajustesOf()
6922: ajusteVale()
6923: isoDia()
6925: vencProxima()
6926: previsaoProxima()
6940: previsaoHtml()
6944: dfAjRender()
6950: addAjuste()
6959: delAjuste()
6964: abrirAjustes()
6965: renderProxCobrancas()
6971: savePixExtra()
6979: dfMultFill()
6987: fdPaga()
6988: dfMultRender()
6997: toggleMultas()
7004: addMulta()
7014: delMulta()
7022: multaPaga()
7031: renderDriverExtras()
7059: mondayAfter()
7067: renderDriverProfileExtras()
7133: semanaDoPix()
7139: **MEUS RECIBOS (área do motorista)**
7141: meusRecibosLista()
7145: reciboRowHtml()
7153: renderEncerradoRecibos()
7158: openMeuReciboDireto()
7159: openMeusRecibos()
7166: closeMeusRecibos()
7167: reciboPdfHtml()
7178: verMeuRecibo()
7185: voltarMeusRecibos()
7186: pdfMeuRecibo()
7190: shareMeuRecibo()
7199: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
7200: editVehicleRent()
7217: nextParcel()
7223: fillNewPixValues()
7259: newPixParts()
7290: **PERÍODO E VENCIMENTO DA COBRANÇA**
7291: dataISO()
7292: dataDe()
7293: dataMais()
7294: dataBR()
7295: diasEntre()
7296: isoSP()
7297: pixPeriodo()
7304: pixDesc()
7305: pixDiasPeriodo()
7310: marcarAjustesPorVenc()
7315: pixDatasNovo()
7324: pixDatasMudou()
7335: pixAluguelProporcional()
7343: pixPeriodoInfo()
7356: pixAddLinha()
7363: pixLinhas()
7365: descSoma()
7375: calcNewPix()
7384: **RECIBO DE PAGAMENTO**
7388: receiptValue()
7389: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
7390: atrasoDados()
7394: cobrarAtraso()
7411: allocatePix()
7430: reciboData()
7453: fmtDateTimeBR()
7454: reciboTexto()
7505: openRecibo()
7522: closeRecibo()
7523: **CORRIGIR RECIBO**
7525: corrigirLinhaHtml()
7535: openCorrigirRecibo()
7558: closeCorrigirRecibo()
7559: corrigirLer()
7565: corrigirSoma()
7572: salvarCorrigirRecibo()
7589: copyRecibo()
7594: reciboCanvas()
7611: reciboPdfBlob()
7629: shareReciboPdf()
7645: rotularTabelas()
7663: areaAberta()
7664: markAreas()
7674: closeAreas()
7678: toggleArea()
7686: dobraSalva()
7687: setDobra()
7692: toggleDobra()
7699: dobraTopo()
7706: renderMasterResumo()
7720: renderMasterTopo()
7742: loadIA()
7764: updateIABadge()
7769: loadIASetting()
7775: paintIASwitch()
7781: toggleIA()
7788: loadRobo()
7797: iaPrepararQr()
7802: paintRobo()
7831: pedirCodigoRobo()
7840: toggleRobo()
7855: iaTodosGerar()
7873: iaTodosCancelar()
7877: iaTodosConfirmar()
7891: loadIARules()
7896: iaAbrirPdf()
7902: renderIARules()
7906: saveIARules()
7911: addIARule()
7916: delIARule()
7920: openIA()
7935: closeIA()
7936: iaShow()
7937: iaPhone()
7942: renderIA()
7984: iaAprovar()
7993: iaPhone2()
7994: iaSend()
8025: iaMark()
8036: iaDelete()
8047: openPixArea()
8056: closePixArea()
8057: renderPixArea()
8101: openEditPix()
8130: deletePix()
8142: closeNewPix()
8144: saveNewPix()
8235: pushSupported()
8236: isIOS()
8237: isStandalone()
8238: b64ToBytes()
8244: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
8249: notifStatus()
8257: stepsList()
8261: notifHelpHtml()
8295: renderNotifModal()
8307: checkDriverNotifications()
8340: activateFromModal()
8353: refreshNotifButton()
8372: subscribePush()
8387: enableNotifications()
8407: closeDocViewer()
8415: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
8427: allFeaturesOn()
8428: feat()
8429: loadDriverFeatures()
8436: saveDriverFeatures()
8441: drawFeatureToggles()
8456: setAllFeatures()
8467: applyDriverFeatures()
8482: **PIX: conferência do código e QR code desenhado no aparelho**
8483: crc16()
8491: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
8493: pixTxt()
8494: pixCampo()
8495: pixGerarCodigo()
8505: pixAutoLigado()
8506: pixAutoMudou()
8511: gerarPixAuto()
8527: pixRecebedorCarregar()
8538: pixRecebedorGuardar()
8545: pixValid()
8551: renderPixQr()
8561: previewNewPixQr()
8571: **FOTO DO MOTORISTA (recortada da CNH)**
8572: photoPath()
8573: fileToCanvas()
8592: cropPhoto()
8606: savePhoto()
8611: photoBoxFrom()
8617: fillAvatar()
8628: fillAvatars()
8641: storedFile()
8648: photoFromCnh()
8660: **FOTO DO PERFIL ACOMPANHA A CNH**
8663: cnhStamp()
8664: photoFiles()
8672: avatarPath()
8677: syncCnhPhotos()
8701: pickImage()
8704: changeDriverPhoto()
8720: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
8722: uploadTmp()
8729: clearTmp()
8734: aiReadFiles()
8740: okDateISO()
8742: noAccents()
8744: makeUsername()
8753: titleCase()
8754: syncNewDriverAccess()
8760: setNewDriverPhoto()
8765: pickNewDriverPhoto()
8769: resetNewDriverForm()
8777: newDriverDocChosen()
8811: anoCrlv()
8815: formatVehicleBrand()
8820: inferVehicleBrand()
8829: normalizeCrlvFields()
8848: applyCrlvFields()
8861: aiReadCrlv()
8875: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
8876: sendWelcomeEmail()
8882: showCredentials()
8893: demoAssistente()
8912: **PERGUNTAR À IA (ÁREA IA, só o master)**
8916: iaChatReset()
8917: iaNorm()
8918: iaAcha()
8924: iaVeicTxt()
8925: iaCamposVeic()
8926: iaDataOk()
8927: iaOpcoes()
8928: iaTodosMotoristas()
8932: iaFerramenta()
9027: renderIAChat()
9044: iaChatDica()
9045: iaChatEnviar()
9080: iaChatNota()
9081: iaCancelarCartao()
9082: iaConfirmarCartao()
9127: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
9128: syncAppFinState()
9137: renderAppEarnings()
9217: saveAppEarning()
9244: workDayISO()
9245: paintDayOff()
9254: renderDayOff()
9261: setDayOff()
9271: aiReadEarning()
9304: **DESPESAS DO APLICATIVO**
9306: appExpCustomTypes()
9307: fillAppExpTypes()
9314: onAppExpTypeChange()
9319: saveAppExpense()
9344: deleteAppExpense()
9353: deleteAppEarning()
9450: loadTermsAcceptances()
9462: termsOf()
9463: currentAcceptance()
9464: needsTermsAcceptance()
9467: fmtDateTime()
9470: termsPlainText()
9474: termsHash()
9482: openTermsGate()
9505: termsGateCheck()
9513: acceptTerms()
9533: acceptanceHtml()
9544: openTermsViewer()
9562: closeTerms()
9568: downloadTermsCopy()
9589: termsBadgeMaster()
9596: termsMasterDetail()
9637: renderTermsSetupBanner()
9650: copyTermsSql()
9660: cnhExpired()
9661: cnhWaiting()
9662: onlyDigits()
9663: normName()
9665: verifyCnh()
9677: renderCnhBanner()
9695: sendNewCnh()
9743: cnhBadgeMaster()
9751: applyPendingCnh()
9759: autoReadNewCnhs()
9777: cnhPendingHtml()
9791: recheckPendingCnh()
9801: rejectPendingCnh()
9811: showContractDoc()
9911: contractPeriodLabel()
9912: contractStatusBadge()
9916: pdfSafeText()
9928: contractPdfFileName()
9937: cwBuildDepositChargeText()
9974: cwBuildDepositClauseText()
9986: buildDefaultClauses()
10033: generateContractPdfBytes()
10052: drawHeader()
10057: newPage()
10064: ensureSpace()
10067: wrapLines()
10091: drawJustifiedLine()
10204: renderContractsTab()
10258: renderDriverRentalContractsBox()
10317: openContractForDriver()
10324: *WIZARD DE CRIAÇÃO / EDIÇÃO DE RASCUNHO / RENOVAÇÃO*
10326: closeContractWizard()
10327: cwPopulateSelects()
10335: cwPopulateLocadores()
10347: cwOnLocadorChange()
10356: cwFillLocador()
10363: cwFillDepositFromDriver()
10391: cwFillDepositFromComercial()
10413: cwSyncDepositClauseOnly()
10423: cwDepCalc()
10468: cwFillDriver()
10486: cwUpdateCrlvBar()
10495: cwNeedsCrlvFill()
10499: cwRefreshMissingBoxIfVisible()
10508: cwReadVehicleCrlv()
10557: cwReadCurrentVehicleCrlv()
10563: cwFillVehicle()
10585: cwOnDriverChange()
10593: cwOnVehicleChange()
10604: cwReadSnapshot()
10645: cwRenderClausesEditor()
10655: cwRebuildClauses()
10663: cwRenderPreview()
10693: cwTogglePreview()
10698: validateContractForEmission()
10715: openContractWizard()
10805: cwSyncSources()
10845: logContractHistory()
10854: persistContract()
10942: saveContractDraft()
10943: emitContract()
10945: ensureContractPdfBlob()
10955: downloadContractPdf()
10967: printContractPdf()
10980: *MODAL DETALHE, ASSINATURAS, UPLOAD ASSINADO, RENOVAR, ENCERRAR, CANCELAR*
10981: closeContractDetail()
10982: openContractDetail()
11051: saveContractSignatures()
11076: uploadSignedContractFile()
11096: terminateContractPrompt()
11111: cancelContractPrompt()
11151: inspectionTypeBadge()
11155: inspectionStatusBadge()
11159: inspectionPdfFileName()
11166: switchContractsSubtab()
11179: renderInspectionsTab()
11239: *ANALISADOR DE IA EM LOTE + CONFIRMAÇÃO PRESENCIAL DE DANOS*
11240: runInspectionBatchAI()
11263: promptInspectionDamageConfirmation()
11341: processInspectionPhotosWithAI()
11396: analyzeSavedInspectionPhotos()
11412: renameInspectionPhoto()
11428: *WIZARD DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO)*
11431: closeInspectionWizard()
11432: openInspectionWizard()
11493: iwCollectSavedPhotosFor()
11526: iwPopulateContractsAndBase()
11541: iwSyncHeaderAndLegal()
11553: iwOnTypeChange()
11559: iwOnVehicleChange()
11572: iwOnDriverChange()
11577: iwOnContractChange()
11584: iwImportSavedPhotos()
11595: iwUploadPhotos()
11639: iwRunAIOnList()
11665: iwAnalyzeWithAI()
11672: iwRenderPhotos()
11710: iwUpdatePhotoField()
11715: iwUpdatePhotoDamage()
11723: iwRemovePhoto()
11729: iwRenderDamagesSummary()
11744: iwRenderComparison()
11763: iwRenderChecklist()
11782: persistInspectionTerm()
11873: saveInspectionDraft()
11874: emitInspectionTerm()
11876: *GERADOR DE PDF A4 DE VISTORIA E DEVOLUÇÃO (com grid real de fotos)*
11877: blobToEmbeddableJpeg()
11906: generateInspectionPdfBytes()
12090: ensureInspectionPdfBlob()
12099: downloadInspectionPdf()
12111: printInspectionPdf()
12124: *MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA*
12125: closeInspectionDetail()
12126: openInspectionDetail()
12183: saveInspectionSignatures()
12207: uploadSignedInspectionFile()
12227: cancelInspectionPrompt()

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
