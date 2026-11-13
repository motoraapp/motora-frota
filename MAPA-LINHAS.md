# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 13/11/2026, 15:05:18. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (13615 linhas)

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
1864: <!-- Anexo I: Termo de Vistoria e Entrega Integrado -->
1932: <!-- Cláusulas editáveis -->
1944: <!-- Prévia -->
1958: <!-- MODAL DETALHE, ASSINATURAS E HISTÓRICO DO CONTRATO -->
1959: #modalContractDetail
1972: <!-- MODAL GERADOR DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO) -->
1973: #modalInspectionTerm
2034: <!-- Fotos da vistoria (lote + reuso + análise IA + confirmação obrigatória de avarias) -->
2057: <!-- Resumo de Avarias Confirmadas + Checklist Bilateral + Ressalvas -->
2097: <!-- MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA -->
2098: #modalInspectionTermDetail
2111: <!-- MODAL CONFIRMAÇÃO DE DANO DETECTADO PELA IA (OBRIGATÓRIO ANTES DE NOMEAR) -->
2112: #modalInspDamageConfirm
2127: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
2128: #modalDocViewer
2136: #modalDocBody
2137: <!-- Conteúdo pré-visualizado -->
2143: #modalTerms
2157: <!-- NOTIFICAÇÕES TOAST -->
2174: lsGet()
2175: lsSet()
2176: lsDel()
2199: demoLoginRole()
2203: demoId()
2204: demoSave()
2205: demoSaved()
2207: *datas no horário de Brasília*
2208: demoLocal()
2209: demoParts()
2210: demoDay()
2211: demoNextDue()
2216: *dados fictícios (4 meses)*
2217: demoBuild()
2450: *documentos fictícios (imagem gerada na hora)*
2451: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
2452: demoDocBlob()
2530: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
2531: demoQuery()
2554: out()
2560: run()
2601: demoOnUpdate()
2611: demoOnInsert()
2723: demoClient()
2926: demoStart()
2934: demoStop()
2940: abrirDemo()
2947: trocarDemo()
2952: demoBanner()
2967: toEmail()
2971: showLogin()
2975: esc()
2980: dataHoraBR()
2988: uiDialogo()
3036: uiConfirm()
3045: uiPrompt()
3051: friendlyError()
3061: unwrapInvokeResult()
3081: devicePrefs()
3084: saveDevicePrefs()
3087: docRef()
3088: viewDocIdx()
3090: setBusy()
3133: **TEMAS**
3142: currentTheme()
3147: applyTheme()
3148: openThemes()
3158: pickTheme()
3164: toggleDarkMode()
3166: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
3168: loadDesignCfg()
3175: applyDesign()
3192: markMasterNav()
3199: fillDesignCfg()
3204: saveDesign()
3218: showToast()
3227: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
3228: senhaErro()
3229: abrirSenha()
3238: salvarIaCodigo()
3248: fecharSenha()
3249: salvarSenha()
3270: loginUserInput()
3275: loginErro()
3279: verSenha()
3284: handleLogin()
3333: logout()
3352: saveFirstLoginPreferences()
3375: carregarDados()
3407: aplicarDados()
3448: loadAndRender()
3475: autoRefresh()
3514: markUpdated()
3519: reload()
3524: renderApp()
3572: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
3575: masterBack()
3577: viewAsDriver()
3599: exitViewAs()
3618: viewOnly()
3619: renderViewAsBanner()
3629: showSection()
3634: withBtn()
3642: toggleDriverStatus()
3651: isOnline()
3653: updateStatusToggleUI()
3666: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
3675: checkApkUpdate()
3690: updateInstallApkButton()
3710: renderDriverPanel()
3968: switchDriverTab()
3983: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
3986: parsePixKey()
3990: normalizePixKey()
3998: pixKeyLooksOk()
4006: togglePixKeyFields()
4012: updatePixKeyPlaceholder()
4018: copyPixKey()
4025: copyPixCode()
4037: receiptBadge()
4047: receiptMasterBox()
4074: receiptAction()
4081: confirmReceipt()
4110: rejectReceipt()
4122: recheckReceipt()
4131: uploadReceipt()
4154: switchMasterTab()
4173: maskPhone()
4182: waLink()
4187: allVeh()
4188: allDrv()
4189: chargeVehicleId()
4201: enviarPedidoParcialAsaas()
4217: pedirPixParcial()
4235: restaurarPixTotal()
4241: responderPixParcial()
4265: contrato30Info()
4295: encerrarContrato()
4312: encerrarContratoPrompt()
4325: reativarContrato()
4349: marcarCaucaoPagoArquivar()
4370: desarquivarFicha()
4388: deliveryInspectionHtml()
4427: uploadDeliveryPhotos()
4454: delDeliveryPhoto()
4472: addCauDesconto()
4497: puxarMultaCaucao()
4518: delCauDesconto()
4540: dfCauDescontosHtml()
4573: dfContratoRender()
4617: encerrarContratoConfirmFicha()
4624: renderMasterPanel()
4788: renderArchivedDrivers()
4833: handleAddVehicle()
4873: deleteVehicle()
4874: cancelDeleteVehicle()
4876: confirmDeleteVehicle()
4900: abrirEditarVeiculo()
4922: evReadStoredCrlv()
4947: evReadChosenCrlv()
4963: fecharEditarVeiculo()
4964: salvarEditarVeiculo()
5001: drvCauMostra()
5008: drvCauLer()
5016: handleAddDriver()
5094: marcarSituacao()
5104: updateDriverPaymentStatus()
5113: deleteDriver()
5114: cancelDeleteDriver()
5116: confirmDeleteDriver()
5138: isImageFile()
5140: prepareFile()
5162: uploadFile()
5173: fileUrl()
5184: downloadName()
5188: renderFilePreview()
5208: renderPdfToCanvas()
5235: viewDoc()
5256: **DINHEIRO**
5257: parseMoney()
5264: fmtMoney()
5265: fmtDate()
5266: todayISO()
5268: **CONFIGURAÇÕES (Gemini e Google Drive)**
5270: loadConfigStatus()
5275: paintConfig()
5280: fillOwnerVehicleSelect()
5286: saveOwnerVehicle()
5308: locadorMerged()
5321: getLocadoresList()
5341: locadorForVehicle()
5350: fillLocadorSettings()
5370: cfgOnLocadorChange()
5371: upsertLocadorInList()
5401: deleteLocadorSetting()
5417: saveLocadorSettings()
5445: openSettings()
5460: closeSettings()
5461: saveConfig()
5471: **ASAAS (Financeiro: chave por motorista ativo + Config: conta API)**
5472: renderAsaasDrivers()
5499: toggleDriverAsaas()
5531: getAtrasoCfg()
5535: fillAtrasoCfg()
5542: saveAtrasoCfg()
5559: atrasoDataBR()
5564: atrasoPrazoUtil()
5571: calcEncargosAtraso()
5590: ehLinhaEncargo()
5591: calcAtrasoMotorista()
5621: atualizarPixAtraso()
5634: loadAsaasInfo()
5648: saveAsaas()
5656: testarAsaas()
5663: copiarAsaas()
5667: testDrive()
5674: resyncDrive()
5682: **FICHA DO MOTORISTA**
5685: openDriverFile()
5717: closeDriverFile()
5719: saveDriverFile()
5784: aiFillDriver()
5823: **CONTROLE FINANCEIRO**
5824: finRange()
5841: dayBR()
5842: inRange()
5844: onFinPeriodChange()
5850: fillFinFilters()
5858: clearFinFilters()
5862: updateFinFilterCount()
5871: openFinance()
5877: switchFinTab()
5888: finCardBtn()
5896: closeFinCardDetail()
5897: closeFinance()
5899: collectRentFinData()
5950: renderFinance()
6008: openFinCardDetail()
6215: openFinExtrato()
6309: renderFinExtratoView()
6390: openFinExtratoReport()
6407: renderFinGrafico()
6427: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
6429: okEmail()
6431: openEmailCompose()
6452: closeEmailCompose()
6453: sendEmailCompose()
6468: emailRecibo()
6473: emailIA()
6481: **RELATÓRIO DO FINANCEIRO**
6483: finFiltersText()
6488: finPeriodText()
6495: buildReportHtml()
6517: openFinReport()
6527: closeFinReport()
6528: printFinReport()
6532: shareFinReport()
6542: emailFinReport()
6548: **DESPESAS DO VEÍCULO**
6550: openExpenses()
6562: closeExpenses()
6563: fillExpenseTypes()
6568: createExpenseType()
6583: aiReadExpense()
6615: renderExpenses()
6637: saveExpense()
6664: deleteExpense()
6693: inspSlotLabel()
6696: normalizeInspDbSlot()
6699: photoDamageBadge()
6708: buildVehicleInspectionReport()
6745: copyVehicleInspectionText()
6753: photoCard()
6795: inspectionHtml()
6875: hydrateImages()
6881: openInspection()
6889: closeInspection()
6893: renderInspectionModal()
6900: uploadInspection()
6957: deleteInspectionPhoto()
6977: fmtDue()
6983: nextDueLocal()
6994: openNewPix()
7024: **CAUÇÃO DO MOTORISTA**
7025: cauOf()
7026: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
7027: devOf()
7028: devCobrancas()
7030: devPrevisao()
7038: dfDevRender()
7065: dfDevIr()
7066: dfDevSalvar()
7071: dfDevAvisar()
7077: dfDevDesfazer()
7081: dfDevReceber()
7090: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
7094: cauPlano()
7102: cauParcela()
7109: cauParcelasTexto()
7113: cauNext()
7120: dfCauFill()
7130: dfCauCalc()
7158: dfCauRead()
7171: expTypeName()
7175: driverFinVehicleId()
7187: cauEntradaItem()
7201: cauPagoDespesaItem()
7216: **CAUÇÃO: quanto já foi pago**
7218: cauStatus()
7228: obsResumoHtml()
7229: cauResumoHtml()
7234: **MULTAS E OUTRAS DESPESAS**
7235: multasOf()
7237: multaPagaAuto()
7242: multasAbertas()
7243: multasPendentes()
7244: multasResumoHtml()
7252: cobOf()
7253: dfCobFill()
7259: dfCobRead()
7262: dfCobInfo()
7272: cobResumoHtml()
7276: ajustesOf()
7280: ajusteVale()
7281: isoDia()
7283: vencProxima()
7284: previsaoProxima()
7298: previsaoHtml()
7302: dfAjRender()
7308: addAjuste()
7317: delAjuste()
7322: abrirAjustes()
7323: renderProxCobrancas()
7329: savePixExtra()
7337: dfMultFill()
7345: fdPaga()
7346: dfMultRender()
7355: toggleMultas()
7362: addMulta()
7372: delMulta()
7380: multaPaga()
7389: renderDriverExtras()
7417: mondayAfter()
7425: renderDriverProfileExtras()
7491: semanaDoPix()
7497: **MEUS RECIBOS (área do motorista)**
7499: meusRecibosLista()
7503: reciboRowHtml()
7511: renderEncerradoRecibos()
7516: openMeuReciboDireto()
7517: openMeusRecibos()
7524: closeMeusRecibos()
7525: reciboPdfHtml()
7536: verMeuRecibo()
7543: voltarMeusRecibos()
7544: pdfMeuRecibo()
7548: shareMeuRecibo()
7557: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
7558: editVehicleRent()
7575: nextParcel()
7581: fillNewPixValues()
7617: newPixParts()
7648: **PERÍODO E VENCIMENTO DA COBRANÇA**
7649: dataISO()
7650: dataDe()
7651: dataMais()
7652: dataBR()
7653: diasEntre()
7654: isoSP()
7655: pixPeriodo()
7662: pixDesc()
7663: pixDiasPeriodo()
7668: marcarAjustesPorVenc()
7673: pixDatasNovo()
7682: pixDatasMudou()
7693: pixAluguelProporcional()
7701: pixPeriodoInfo()
7714: pixAddLinha()
7721: pixLinhas()
7723: descSoma()
7733: calcNewPix()
7742: **RECIBO DE PAGAMENTO**
7746: receiptValue()
7747: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
7748: atrasoDados()
7752: cobrarAtraso()
7769: allocatePix()
7788: reciboData()
7811: fmtDateTimeBR()
7812: reciboTexto()
7863: openRecibo()
7880: closeRecibo()
7881: **CORRIGIR RECIBO**
7883: corrigirLinhaHtml()
7893: openCorrigirRecibo()
7916: closeCorrigirRecibo()
7917: corrigirLer()
7923: corrigirSoma()
7930: salvarCorrigirRecibo()
7947: copyRecibo()
7952: reciboCanvas()
7969: reciboPdfBlob()
7987: shareReciboPdf()
8003: rotularTabelas()
8021: areaAberta()
8022: markAreas()
8032: closeAreas()
8036: toggleArea()
8044: dobraSalva()
8045: setDobra()
8050: toggleDobra()
8057: dobraTopo()
8064: renderMasterResumo()
8078: renderMasterTopo()
8100: loadIA()
8122: updateIABadge()
8127: loadIASetting()
8133: paintIASwitch()
8139: toggleIA()
8146: loadRobo()
8155: iaPrepararQr()
8160: paintRobo()
8189: pedirCodigoRobo()
8198: toggleRobo()
8213: iaTodosGerar()
8231: iaTodosCancelar()
8235: iaTodosConfirmar()
8249: loadIARules()
8254: iaAbrirPdf()
8260: renderIARules()
8264: saveIARules()
8269: addIARule()
8274: delIARule()
8278: openIA()
8293: closeIA()
8294: iaShow()
8295: iaPhone()
8300: renderIA()
8342: iaAprovar()
8351: iaPhone2()
8352: iaSend()
8383: iaMark()
8394: iaDelete()
8405: openPixArea()
8414: closePixArea()
8415: renderPixArea()
8459: openEditPix()
8488: deletePix()
8500: closeNewPix()
8502: saveNewPix()
8593: pushSupported()
8594: isIOS()
8595: isStandalone()
8596: b64ToBytes()
8602: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
8607: notifStatus()
8615: stepsList()
8619: notifHelpHtml()
8653: renderNotifModal()
8665: checkDriverNotifications()
8698: activateFromModal()
8711: refreshNotifButton()
8730: subscribePush()
8745: enableNotifications()
8765: closeDocViewer()
8773: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
8785: allFeaturesOn()
8786: feat()
8787: loadDriverFeatures()
8794: saveDriverFeatures()
8799: drawFeatureToggles()
8814: setAllFeatures()
8825: applyDriverFeatures()
8840: **PIX: conferência do código e QR code desenhado no aparelho**
8841: crc16()
8849: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
8851: pixTxt()
8852: pixCampo()
8853: pixGerarCodigo()
8863: pixAutoLigado()
8864: pixAutoMudou()
8869: gerarPixAuto()
8885: pixRecebedorCarregar()
8896: pixRecebedorGuardar()
8903: pixValid()
8909: renderPixQr()
8919: previewNewPixQr()
8929: **FOTO DO MOTORISTA (recortada da CNH)**
8930: photoPath()
8931: fileToCanvas()
8950: cropPhoto()
8964: savePhoto()
8969: photoBoxFrom()
8975: fillAvatar()
8986: fillAvatars()
8999: storedFile()
9006: photoFromCnh()
9018: **FOTO DO PERFIL ACOMPANHA A CNH**
9021: cnhStamp()
9022: photoFiles()
9030: avatarPath()
9035: syncCnhPhotos()
9059: pickImage()
9062: changeDriverPhoto()
9078: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
9080: uploadTmp()
9087: clearTmp()
9092: aiReadFiles()
9098: okDateISO()
9100: noAccents()
9102: makeUsername()
9111: titleCase()
9112: syncNewDriverAccess()
9118: setNewDriverPhoto()
9123: pickNewDriverPhoto()
9127: resetNewDriverForm()
9135: newDriverDocChosen()
9169: anoCrlv()
9173: formatVehicleBrand()
9178: inferVehicleBrand()
9187: normalizeCrlvFields()
9206: applyCrlvFields()
9219: aiReadCrlv()
9233: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
9234: sendWelcomeEmail()
9240: showCredentials()
9251: demoAssistente()
9270: **PERGUNTAR À IA (ÁREA IA, só o master)**
9274: iaChatReset()
9275: iaNorm()
9276: iaAcha()
9282: iaVeicTxt()
9283: iaCamposVeic()
9284: iaDataOk()
9285: iaOpcoes()
9286: iaTodosMotoristas()
9290: iaFerramenta()
9385: renderIAChat()
9402: iaChatDica()
9403: iaChatEnviar()
9438: iaChatNota()
9439: iaCancelarCartao()
9440: iaConfirmarCartao()
9485: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
9486: syncAppFinState()
9495: renderAppEarnings()
9575: saveAppEarning()
9602: workDayISO()
9603: paintDayOff()
9612: renderDayOff()
9619: setDayOff()
9629: aiReadEarning()
9662: **DESPESAS DO APLICATIVO**
9664: appExpCustomTypes()
9665: fillAppExpTypes()
9672: onAppExpTypeChange()
9677: saveAppExpense()
9702: deleteAppExpense()
9711: deleteAppEarning()
9808: loadTermsAcceptances()
9820: termsOf()
9821: currentAcceptance()
9822: needsTermsAcceptance()
9825: fmtDateTime()
9828: termsPlainText()
9832: termsHash()
9840: openTermsGate()
9863: termsGateCheck()
9871: acceptTerms()
9891: acceptanceHtml()
9902: openTermsViewer()
9920: closeTerms()
9926: downloadTermsCopy()
9947: termsBadgeMaster()
9954: termsMasterDetail()
9995: renderTermsSetupBanner()
10008: copyTermsSql()
10018: cnhExpired()
10019: cnhWaiting()
10020: onlyDigits()
10021: normName()
10023: verifyCnh()
10035: renderCnhBanner()
10053: sendNewCnh()
10101: cnhBadgeMaster()
10109: applyPendingCnh()
10117: autoReadNewCnhs()
10135: cnhPendingHtml()
10149: recheckPendingCnh()
10159: rejectPendingCnh()
10169: showContractDoc()
10287: inspectPdfSignaturesBytes()
10306: readPdfFileAsBase64AndInspect()
10321: govBrSignersList()
10333: renderGovBrFlowBox()
10385: driverGovBrBlockHtml()
10414: govBrPublicAppBaseUrl()
10418: createGovBrInvite()
10450: submitMasterGovBrPdf()
10471: submitDriverGovBrPdf()
10490: loadGovBrInvitePage()
10561: submitGovBrInvitePdf()
10580: exitGovBrInviteToLogin()
10599: contractPeriodLabel()
10600: contractStatusBadge()
10604: pdfSafeText()
10616: contractPdfFileName()
10625: cwBuildDepositChargeText()
10667: cwBuildDepositClauseText()
10679: lcClauseStart()
10686: buildDefaultClauses()
10757: generateContractPdfBytes()
10776: drawHeader()
10781: newPage()
10788: ensureSpace()
10791: wrapLines()
10815: drawJustifiedLine()
11081: renderContractsTab()
11135: renderDriverRentalContractsBox()
11194: openContractForDriver()
11201: *WIZARD DE CRIAÇÃO / EDIÇÃO DE RASCUNHO / RENOVAÇÃO*
11203: closeContractWizard()
11204: cwPopulateSelects()
11212: cwPopulateLocadores()
11224: cwOnLocadorChange()
11233: defaultWitness1ForLocador()
11241: cwApplyDefaultWitness1()
11254: cwFillLocador()
11263: cwFillDepositFromDriver()
11291: cwFillDepositFromComercial()
11313: cwSyncClauseIdx()
11322: cwSyncDepositClauseOnly()
11323: cwUpdateTrialPreview()
11339: cwDepCalc()
11384: cwApplyDriverContractDefaults()
11401: cwFillDriver()
11420: cwUpdateCrlvBar()
11429: cwNeedsCrlvFill()
11433: cwRefreshMissingBoxIfVisible()
11442: cwReadVehicleCrlv()
11491: cwReadCurrentVehicleCrlv()
11497: cwFillVehicle()
11519: cwOnDriverChange()
11535: cwOnVehicleChange()
11548: cwDefaultChecklist()
11553: cwToggleVistoriaFields()
11558: cwRenderInspChecklist()
11577: cwRenderInspDamagesSummary()
11591: cwRenderInspPhotos()
11628: cwUpdateInspPhotoDamage()
11636: cwSyncVistoriaFromVehicle()
11653: cwImportSavedPhotos()
11669: cwUploadInspPhotos()
11709: cwAnalyzeInspWithAI()
11718: cwReadSnapshot()
11777: cwRenderClausesEditor()
11787: cwRebuildClauses()
11795: cwRenderPreview()
11850: cwTogglePreview()
11855: validateContractForEmission()
11872: openContractWizard()
12008: cwSyncSources()
12063: logContractHistory()
12072: persistContract()
12163: saveContractDraft()
12164: emitContract()
12166: ensureContractPdfBlob()
12177: downloadContractPdf()
12189: printContractPdf()
12202: *MODAL DETALHE, ASSINATURAS, UPLOAD ASSINADO, RENOVAR, ENCERRAR, CANCELAR*
12203: closeContractDetail()
12204: openContractDetail()
12277: saveContractSignatures()
12304: uploadSignedContractFile()
12326: terminateContractPrompt()
12341: clearDriverPathsIfMatching()
12351: cancelContractPrompt()
12367: deleteContractPrompt()
12421: inspectionTypeBadge()
12425: inspectionStatusBadge()
12429: inspectionPdfFileName()
12436: switchContractsSubtab()
12449: renderInspectionsTab()
12509: *ANALISADOR DE IA EM LOTE + CONFIRMAÇÃO PRESENCIAL DE DANOS*
12510: runInspectionBatchAI()
12533: promptInspectionDamageConfirmation()
12611: processInspectionPhotosWithAI()
12667: analyzeSavedInspectionPhotos()
12683: renameInspectionPhoto()
12699: *WIZARD DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO)*
12702: closeInspectionWizard()
12703: openInspectionWizard()
12770: iwCollectSavedPhotosFor()
12803: iwPopulateContractsAndBase()
12826: iwSyncHeaderAndLegal()
12838: iwOnTypeChange()
12844: iwOnVehicleChange()
12862: iwOnDriverChange()
12867: iwOnContractChange()
12874: iwImportSavedPhotos()
12885: iwUploadPhotos()
12938: iwResolveEntregaBaseline()
12959: iwRunAIOnList()
12985: iwAnalyzeWithAI()
12992: iwRenderPhotos()
13031: iwUpdatePhotoField()
13036: iwUpdatePhotoDamage()
13044: iwRemovePhoto()
13050: iwRenderDamagesSummary()
13065: iwRenderComparison()
13084: iwRenderChecklist()
13103: persistInspectionTerm()
13206: saveInspectionDraft()
13207: emitInspectionTerm()
13209: *GERADOR DE PDF A4 DE VISTORIA E DEVOLUÇÃO (com grid real de fotos)*
13210: blobToEmbeddableJpeg()
13240: embedBlobIntoPdf()
13253: generateInspectionPdfBytes()
13453: ensureInspectionPdfBlob()
13463: downloadInspectionPdf()
13475: printInspectionPdf()
13488: *MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA*
13489: closeInspectionDetail()
13490: openInspectionDetail()
13550: saveInspectionSignatures()
13576: uploadSignedInspectionFile()
13598: cancelInspectionPrompt()

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

## supabase/functions/motora-assinatura/index.ts (542 linhas)

7: serviceKey()
27: json()
47: maskCpf()
53: inspectPdfSignatures()
77: makeToken()
84: resolveDoc()
92: publicDocSummary()
129: authUser()

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
