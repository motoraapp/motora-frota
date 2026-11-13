# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 13/11/2026, 00:03:41. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (12322 linhas)

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
4891: prepareFile()
4913: uploadFile()
4924: fileUrl()
4935: downloadName()
4939: renderFilePreview()
4959: renderPdfToCanvas()
4986: viewDoc()
5007: **DINHEIRO**
5008: parseMoney()
5015: fmtMoney()
5016: fmtDate()
5017: todayISO()
5019: **CONFIGURAÇÕES (Gemini e Google Drive)**
5021: loadConfigStatus()
5026: paintConfig()
5031: fillOwnerVehicleSelect()
5037: saveOwnerVehicle()
5059: locadorMerged()
5072: getLocadoresList()
5092: locadorForVehicle()
5101: fillLocadorSettings()
5121: cfgOnLocadorChange()
5122: upsertLocadorInList()
5152: deleteLocadorSetting()
5168: saveLocadorSettings()
5196: openSettings()
5211: closeSettings()
5212: saveConfig()
5222: **ASAAS (Financeiro: chave por motorista ativo + Config: conta API)**
5223: renderAsaasDrivers()
5250: toggleDriverAsaas()
5282: getAtrasoCfg()
5286: fillAtrasoCfg()
5293: saveAtrasoCfg()
5310: atrasoDataBR()
5315: atrasoPrazoUtil()
5322: calcEncargosAtraso()
5341: ehLinhaEncargo()
5342: calcAtrasoMotorista()
5372: atualizarPixAtraso()
5385: loadAsaasInfo()
5399: saveAsaas()
5407: testarAsaas()
5414: copiarAsaas()
5418: testDrive()
5425: resyncDrive()
5433: **FICHA DO MOTORISTA**
5436: openDriverFile()
5468: closeDriverFile()
5470: saveDriverFile()
5535: aiFillDriver()
5574: **CONTROLE FINANCEIRO**
5575: finRange()
5592: dayBR()
5593: inRange()
5595: onFinPeriodChange()
5601: fillFinFilters()
5609: clearFinFilters()
5613: updateFinFilterCount()
5622: openFinance()
5628: switchFinTab()
5639: finCardBtn()
5647: closeFinCardDetail()
5648: closeFinance()
5650: collectRentFinData()
5701: renderFinance()
5759: openFinCardDetail()
5966: openFinExtrato()
6060: renderFinExtratoView()
6141: openFinExtratoReport()
6158: renderFinGrafico()
6178: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
6180: okEmail()
6182: openEmailCompose()
6203: closeEmailCompose()
6204: sendEmailCompose()
6219: emailRecibo()
6224: emailIA()
6232: **RELATÓRIO DO FINANCEIRO**
6234: finFiltersText()
6239: finPeriodText()
6246: buildReportHtml()
6268: openFinReport()
6278: closeFinReport()
6279: printFinReport()
6283: shareFinReport()
6293: emailFinReport()
6299: **DESPESAS DO VEÍCULO**
6301: openExpenses()
6313: closeExpenses()
6314: fillExpenseTypes()
6319: createExpenseType()
6334: aiReadExpense()
6366: renderExpenses()
6388: saveExpense()
6415: deleteExpense()
6444: inspSlotLabel()
6447: photoDamageBadge()
6456: photoCard()
6494: inspectionHtml()
6541: hydrateImages()
6547: openInspection()
6555: closeInspection()
6559: renderInspectionModal()
6566: uploadInspection()
6615: deleteInspectionPhoto()
6635: fmtDue()
6641: nextDueLocal()
6652: openNewPix()
6682: **CAUÇÃO DO MOTORISTA**
6683: cauOf()
6684: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
6685: devOf()
6686: devCobrancas()
6688: devPrevisao()
6696: dfDevRender()
6723: dfDevIr()
6724: dfDevSalvar()
6729: dfDevAvisar()
6735: dfDevDesfazer()
6739: dfDevReceber()
6748: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
6752: cauPlano()
6760: cauParcela()
6767: cauParcelasTexto()
6771: cauNext()
6778: dfCauFill()
6788: dfCauCalc()
6816: dfCauRead()
6829: expTypeName()
6833: driverFinVehicleId()
6845: cauEntradaItem()
6859: cauPagoDespesaItem()
6874: **CAUÇÃO: quanto já foi pago**
6876: cauStatus()
6886: obsResumoHtml()
6887: cauResumoHtml()
6892: **MULTAS E OUTRAS DESPESAS**
6893: multasOf()
6895: multaPagaAuto()
6900: multasAbertas()
6901: multasPendentes()
6902: multasResumoHtml()
6910: cobOf()
6911: dfCobFill()
6917: dfCobRead()
6920: dfCobInfo()
6930: cobResumoHtml()
6934: ajustesOf()
6938: ajusteVale()
6939: isoDia()
6941: vencProxima()
6942: previsaoProxima()
6956: previsaoHtml()
6960: dfAjRender()
6966: addAjuste()
6975: delAjuste()
6980: abrirAjustes()
6981: renderProxCobrancas()
6987: savePixExtra()
6995: dfMultFill()
7003: fdPaga()
7004: dfMultRender()
7013: toggleMultas()
7020: addMulta()
7030: delMulta()
7038: multaPaga()
7047: renderDriverExtras()
7075: mondayAfter()
7083: renderDriverProfileExtras()
7149: semanaDoPix()
7155: **MEUS RECIBOS (área do motorista)**
7157: meusRecibosLista()
7161: reciboRowHtml()
7169: renderEncerradoRecibos()
7174: openMeuReciboDireto()
7175: openMeusRecibos()
7182: closeMeusRecibos()
7183: reciboPdfHtml()
7194: verMeuRecibo()
7201: voltarMeusRecibos()
7202: pdfMeuRecibo()
7206: shareMeuRecibo()
7215: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
7216: editVehicleRent()
7233: nextParcel()
7239: fillNewPixValues()
7275: newPixParts()
7306: **PERÍODO E VENCIMENTO DA COBRANÇA**
7307: dataISO()
7308: dataDe()
7309: dataMais()
7310: dataBR()
7311: diasEntre()
7312: isoSP()
7313: pixPeriodo()
7320: pixDesc()
7321: pixDiasPeriodo()
7326: marcarAjustesPorVenc()
7331: pixDatasNovo()
7340: pixDatasMudou()
7351: pixAluguelProporcional()
7359: pixPeriodoInfo()
7372: pixAddLinha()
7379: pixLinhas()
7381: descSoma()
7391: calcNewPix()
7400: **RECIBO DE PAGAMENTO**
7404: receiptValue()
7405: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
7406: atrasoDados()
7410: cobrarAtraso()
7427: allocatePix()
7446: reciboData()
7469: fmtDateTimeBR()
7470: reciboTexto()
7521: openRecibo()
7538: closeRecibo()
7539: **CORRIGIR RECIBO**
7541: corrigirLinhaHtml()
7551: openCorrigirRecibo()
7574: closeCorrigirRecibo()
7575: corrigirLer()
7581: corrigirSoma()
7588: salvarCorrigirRecibo()
7605: copyRecibo()
7610: reciboCanvas()
7627: reciboPdfBlob()
7645: shareReciboPdf()
7661: rotularTabelas()
7679: areaAberta()
7680: markAreas()
7690: closeAreas()
7694: toggleArea()
7702: dobraSalva()
7703: setDobra()
7708: toggleDobra()
7715: dobraTopo()
7722: renderMasterResumo()
7736: renderMasterTopo()
7758: loadIA()
7780: updateIABadge()
7785: loadIASetting()
7791: paintIASwitch()
7797: toggleIA()
7804: loadRobo()
7813: iaPrepararQr()
7818: paintRobo()
7847: pedirCodigoRobo()
7856: toggleRobo()
7871: iaTodosGerar()
7889: iaTodosCancelar()
7893: iaTodosConfirmar()
7907: loadIARules()
7912: iaAbrirPdf()
7918: renderIARules()
7922: saveIARules()
7927: addIARule()
7932: delIARule()
7936: openIA()
7951: closeIA()
7952: iaShow()
7953: iaPhone()
7958: renderIA()
8000: iaAprovar()
8009: iaPhone2()
8010: iaSend()
8041: iaMark()
8052: iaDelete()
8063: openPixArea()
8072: closePixArea()
8073: renderPixArea()
8117: openEditPix()
8146: deletePix()
8158: closeNewPix()
8160: saveNewPix()
8251: pushSupported()
8252: isIOS()
8253: isStandalone()
8254: b64ToBytes()
8260: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
8265: notifStatus()
8273: stepsList()
8277: notifHelpHtml()
8311: renderNotifModal()
8323: checkDriverNotifications()
8356: activateFromModal()
8369: refreshNotifButton()
8388: subscribePush()
8403: enableNotifications()
8423: closeDocViewer()
8431: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
8443: allFeaturesOn()
8444: feat()
8445: loadDriverFeatures()
8452: saveDriverFeatures()
8457: drawFeatureToggles()
8472: setAllFeatures()
8483: applyDriverFeatures()
8498: **PIX: conferência do código e QR code desenhado no aparelho**
8499: crc16()
8507: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
8509: pixTxt()
8510: pixCampo()
8511: pixGerarCodigo()
8521: pixAutoLigado()
8522: pixAutoMudou()
8527: gerarPixAuto()
8543: pixRecebedorCarregar()
8554: pixRecebedorGuardar()
8561: pixValid()
8567: renderPixQr()
8577: previewNewPixQr()
8587: **FOTO DO MOTORISTA (recortada da CNH)**
8588: photoPath()
8589: fileToCanvas()
8608: cropPhoto()
8622: savePhoto()
8627: photoBoxFrom()
8633: fillAvatar()
8644: fillAvatars()
8657: storedFile()
8664: photoFromCnh()
8676: **FOTO DO PERFIL ACOMPANHA A CNH**
8679: cnhStamp()
8680: photoFiles()
8688: avatarPath()
8693: syncCnhPhotos()
8717: pickImage()
8720: changeDriverPhoto()
8736: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
8738: uploadTmp()
8745: clearTmp()
8750: aiReadFiles()
8756: okDateISO()
8758: noAccents()
8760: makeUsername()
8769: titleCase()
8770: syncNewDriverAccess()
8776: setNewDriverPhoto()
8781: pickNewDriverPhoto()
8785: resetNewDriverForm()
8793: newDriverDocChosen()
8827: anoCrlv()
8831: formatVehicleBrand()
8836: inferVehicleBrand()
8845: normalizeCrlvFields()
8864: applyCrlvFields()
8877: aiReadCrlv()
8891: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
8892: sendWelcomeEmail()
8898: showCredentials()
8909: demoAssistente()
8928: **PERGUNTAR À IA (ÁREA IA, só o master)**
8932: iaChatReset()
8933: iaNorm()
8934: iaAcha()
8940: iaVeicTxt()
8941: iaCamposVeic()
8942: iaDataOk()
8943: iaOpcoes()
8944: iaTodosMotoristas()
8948: iaFerramenta()
9043: renderIAChat()
9060: iaChatDica()
9061: iaChatEnviar()
9096: iaChatNota()
9097: iaCancelarCartao()
9098: iaConfirmarCartao()
9143: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
9144: syncAppFinState()
9153: renderAppEarnings()
9233: saveAppEarning()
9260: workDayISO()
9261: paintDayOff()
9270: renderDayOff()
9277: setDayOff()
9287: aiReadEarning()
9320: **DESPESAS DO APLICATIVO**
9322: appExpCustomTypes()
9323: fillAppExpTypes()
9330: onAppExpTypeChange()
9335: saveAppExpense()
9360: deleteAppExpense()
9369: deleteAppEarning()
9466: loadTermsAcceptances()
9478: termsOf()
9479: currentAcceptance()
9480: needsTermsAcceptance()
9483: fmtDateTime()
9486: termsPlainText()
9490: termsHash()
9498: openTermsGate()
9521: termsGateCheck()
9529: acceptTerms()
9549: acceptanceHtml()
9560: openTermsViewer()
9578: closeTerms()
9584: downloadTermsCopy()
9605: termsBadgeMaster()
9612: termsMasterDetail()
9653: renderTermsSetupBanner()
9666: copyTermsSql()
9676: cnhExpired()
9677: cnhWaiting()
9678: onlyDigits()
9679: normName()
9681: verifyCnh()
9693: renderCnhBanner()
9711: sendNewCnh()
9759: cnhBadgeMaster()
9767: applyPendingCnh()
9775: autoReadNewCnhs()
9793: cnhPendingHtml()
9807: recheckPendingCnh()
9817: rejectPendingCnh()
9827: showContractDoc()
9927: contractPeriodLabel()
9928: contractStatusBadge()
9932: pdfSafeText()
9944: contractPdfFileName()
9953: cwBuildDepositChargeText()
9990: cwBuildDepositClauseText()
10002: buildDefaultClauses()
10054: generateContractPdfBytes()
10073: drawHeader()
10078: newPage()
10085: ensureSpace()
10088: wrapLines()
10112: drawJustifiedLine()
10225: renderContractsTab()
10279: renderDriverRentalContractsBox()
10338: openContractForDriver()
10345: *WIZARD DE CRIAÇÃO / EDIÇÃO DE RASCUNHO / RENOVAÇÃO*
10347: closeContractWizard()
10348: cwPopulateSelects()
10356: cwPopulateLocadores()
10368: cwOnLocadorChange()
10377: defaultWitness1ForLocador()
10385: cwApplyDefaultWitness1()
10398: cwFillLocador()
10406: cwFillDepositFromDriver()
10434: cwFillDepositFromComercial()
10456: cwSyncClauseIdx()
10465: cwSyncDepositClauseOnly()
10466: cwUpdateTrialPreview()
10482: cwDepCalc()
10527: cwFillDriver()
10545: cwUpdateCrlvBar()
10554: cwNeedsCrlvFill()
10558: cwRefreshMissingBoxIfVisible()
10567: cwReadVehicleCrlv()
10616: cwReadCurrentVehicleCrlv()
10622: cwFillVehicle()
10644: cwOnDriverChange()
10652: cwOnVehicleChange()
10663: cwReadSnapshot()
10706: cwRenderClausesEditor()
10716: cwRebuildClauses()
10724: cwRenderPreview()
10754: cwTogglePreview()
10759: validateContractForEmission()
10776: openContractWizard()
10883: cwSyncSources()
10923: logContractHistory()
10932: persistContract()
11020: saveContractDraft()
11021: emitContract()
11023: ensureContractPdfBlob()
11033: downloadContractPdf()
11045: printContractPdf()
11058: *MODAL DETALHE, ASSINATURAS, UPLOAD ASSINADO, RENOVAR, ENCERRAR, CANCELAR*
11059: closeContractDetail()
11060: openContractDetail()
11129: saveContractSignatures()
11154: uploadSignedContractFile()
11174: terminateContractPrompt()
11189: cancelContractPrompt()
11229: inspectionTypeBadge()
11233: inspectionStatusBadge()
11237: inspectionPdfFileName()
11244: switchContractsSubtab()
11257: renderInspectionsTab()
11317: *ANALISADOR DE IA EM LOTE + CONFIRMAÇÃO PRESENCIAL DE DANOS*
11318: runInspectionBatchAI()
11341: promptInspectionDamageConfirmation()
11419: processInspectionPhotosWithAI()
11474: analyzeSavedInspectionPhotos()
11490: renameInspectionPhoto()
11506: *WIZARD DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO)*
11509: closeInspectionWizard()
11510: openInspectionWizard()
11571: iwCollectSavedPhotosFor()
11604: iwPopulateContractsAndBase()
11619: iwSyncHeaderAndLegal()
11631: iwOnTypeChange()
11637: iwOnVehicleChange()
11650: iwOnDriverChange()
11655: iwOnContractChange()
11662: iwImportSavedPhotos()
11673: iwUploadPhotos()
11717: iwRunAIOnList()
11743: iwAnalyzeWithAI()
11750: iwRenderPhotos()
11788: iwUpdatePhotoField()
11793: iwUpdatePhotoDamage()
11801: iwRemovePhoto()
11807: iwRenderDamagesSummary()
11822: iwRenderComparison()
11841: iwRenderChecklist()
11860: persistInspectionTerm()
11951: saveInspectionDraft()
11952: emitInspectionTerm()
11954: *GERADOR DE PDF A4 DE VISTORIA E DEVOLUÇÃO (com grid real de fotos)*
11955: blobToEmbeddableJpeg()
11984: generateInspectionPdfBytes()
12168: ensureInspectionPdfBlob()
12177: downloadInspectionPdf()
12189: printInspectionPdf()
12202: *MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA*
12203: closeInspectionDetail()
12204: openInspectionDetail()
12261: saveInspectionSignatures()
12285: uploadSignedInspectionFile()
12305: cancelInspectionPrompt()

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
