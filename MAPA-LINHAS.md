# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 25/11/2026, 17:29:57. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (13944 linhas)

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
286: <!-- Botão "Instalar app" (só aparece em celular Android, fora do próprio app) -->
291: <!-- Aviso: nova versão do app Android -->
294: <!-- Aviso vermelho: notificações desligadas -->
297: <!-- Aviso vermelho: CNH vencida (com botão para enviar a nova) -->
301: <!-- Aviso de Pix / pagamento pendente -->
304: <!-- Navegação de Abas -->
322: <!-- Conteúdo das Abas Motorista -->
325: <!-- Aba CRLV-e -->
326: #tabDrvCrlv
331: <!-- Renderizado dinamicamente -->
335: <!-- Aba Contrato -->
336: #tabDrvContract
346: <!-- Renderizado dinamicamente -->
350: <!-- Aba Vistoria -->
351: #tabDrvInspection
358: <!-- Aba Pagamento -->
359: #tabDrvPayment
372: <!-- Caução e multas do motorista -->
374: <!-- Valor e descrição da cobrança -->
384: <!-- Seção Pix -->
398: <!-- QR Code Renderizado aqui -->
431: <!-- Seção Upload de Comprovante -->
448: <!-- Lista de comprovantes -->
453: <!-- Recibos quando o contrato está encerrado -->
460: <!-- PAINEL MASTER (ADMINISTRAÇÃO) -->
461: #secMasterPanel
501: <!-- Aviso: falta criar a tabela dos termos no banco -->
504: <!-- SUB-ABA: GESTÃO DE VEÍCULOS -->
506: <!-- Lista de Veículos -->
522: <!-- Renderizado via JS -->
529: <!-- Form de Adicionar Veículo -->
576: <!-- SUB-ABA: CONTRATOS DE LOCAÇÃO E VISTORIAS -->
676: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
682: <!-- Lista de Motoristas (sem moldura: os cartões já são a moldura) -->
687: <!-- Cartões dos motoristas: renderizados em renderMasterPanel (cartão curto + "Mais ações") -->
692: <!-- Fichas Arquivadas (após marcar caução pago) -->
701: <!-- Form de Adicionar Motorista -->
796: <!-- Barra de baixo do dono (só no design novo) -->
807: <!-- MODAL PRIMEIRO LOGIN -->
808: #modalFirstLogin
842: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
843: #modalNotif
856: <!-- MODAL VISTORIA (MASTER) -->
857: #modalInspection
870: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
871: #modalSettings
1036: <!-- MODAL TEMAS -->
1037: #modalThemes
1048: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
1049: #modalCreds
1064: <!-- JANELA DE CONFIRMAÇÃO DO APP (substitui confirm/prompt do navegador; ver uiDialogo) -->
1079: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
1080: #modalDriverFile
1122: <!-- CONTRATO DE LOCAÇÃO (rental_contracts + ações) -->
1126: <!-- ENCERRAMENTO DE CONTRATO (profiles.pix_extra.contrato_encerrado) -->
1155: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
1170: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
1212: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
1213: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
1214: #modalRecibo
1233: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
1234: #modalPixArea
1250: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
1251: #modalIA
1333: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1334: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1335: #modalEditVeh
1372: #modalSenha
1395: #modalAvisoDev
1421: #modalMeusRecibos
1439: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1440: #modalEmail
1460: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1461: #modalReport
1476: #modalFinCardDetail
1489: #modalFinance
1522: <!-- FILTROS -->
1572: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1592: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1593: #modalExpenses
1628: <!-- MODAL NOVO PIX -->
1629: #modalNewPix
1681: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1739: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1740: #modalCorrigirRecibo
1754: <!-- MODAL WIZARD DE CONTRATO DE LOCAÇÃO -->
1755: #modalContractWizard
1771: <!-- Seleção Motorista & Veículo -->
1783: <!-- Locador -->
1804: <!-- Locatário -->
1825: <!-- Veículo -->
1848: <!-- Configuração Comercial -->
1924: <!-- Anexo I: Termo de Vistoria e Entrega Integrado -->
1992: <!-- Cláusulas editáveis -->
2004: <!-- Prévia -->
2018: <!-- MODAL DETALHE, ASSINATURAS E HISTÓRICO DO CONTRATO -->
2019: #modalContractDetail
2032: <!-- MODAL GERADOR DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO) -->
2033: #modalInspectionTerm
2094: <!-- Fotos da vistoria (lote + reuso + análise IA + confirmação obrigatória de avarias) -->
2117: <!-- Resumo de Avarias Confirmadas + Checklist Bilateral + Ressalvas -->
2157: <!-- MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA -->
2158: #modalInspectionTermDetail
2171: <!-- MODAL CONFIRMAÇÃO DE DANO DETECTADO PELA IA (OBRIGATÓRIO ANTES DE NOMEAR) -->
2172: #modalInspDamageConfirm
2187: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
2188: #modalDocViewer
2196: #modalDocBody
2197: <!-- Conteúdo pré-visualizado -->
2203: #modalTerms
2217: <!-- NOTIFICAÇÕES TOAST -->
2234: lsGet()
2235: lsSet()
2236: lsDel()
2259: demoLoginRole()
2263: demoId()
2264: demoSave()
2265: demoSaved()
2267: *datas no horário de Brasília*
2268: demoLocal()
2269: demoParts()
2270: demoDay()
2271: demoNextDue()
2276: *dados fictícios (4 meses)*
2277: demoBuild()
2510: *documentos fictícios (imagem gerada na hora)*
2511: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
2512: demoDocBlob()
2590: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
2591: demoQuery()
2614: out()
2620: run()
2661: demoOnUpdate()
2671: demoOnInsert()
2819: demoClient()
3022: demoStart()
3030: demoStop()
3036: abrirDemo()
3043: trocarDemo()
3048: demoBanner()
3063: toEmail()
3067: showLogin()
3071: esc()
3076: toBRTInput()
3089: parseBRTInputToIso()
3098: dataHoraBR()
3112: uiDialogo()
3160: uiConfirm()
3169: uiPrompt()
3175: friendlyError()
3185: unwrapInvokeResult()
3205: devicePrefs()
3208: saveDevicePrefs()
3211: docRef()
3212: viewDocIdx()
3214: setBusy()
3257: **TEMAS**
3266: currentTheme()
3271: applyTheme()
3272: openThemes()
3282: pickTheme()
3288: toggleDarkMode()
3290: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
3292: loadDesignCfg()
3299: applyDesign()
3316: markMasterNav()
3323: fillDesignCfg()
3328: saveDesign()
3342: showToast()
3351: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
3352: senhaErro()
3353: abrirSenha()
3362: salvarIaCodigo()
3372: fecharSenha()
3373: salvarSenha()
3394: loginUserInput()
3399: loginErro()
3403: verSenha()
3408: handleLogin()
3457: logout()
3476: saveFirstLoginPreferences()
3499: carregarDados()
3531: aplicarDados()
3572: loadAndRender()
3599: autoRefresh()
3638: markUpdated()
3643: reload()
3648: renderApp()
3696: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
3699: masterBack()
3701: viewAsDriver()
3723: exitViewAs()
3742: viewOnly()
3743: renderViewAsBanner()
3753: showSection()
3758: withBtn()
3766: toggleDriverStatus()
3775: isOnline()
3777: updateStatusToggleUI()
3790: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
3799: checkApkUpdate()
3814: updateInstallApkButton()
3834: renderDriverPanel()
4093: switchDriverTab()
4108: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
4111: parsePixKey()
4115: normalizePixKey()
4123: pixKeyLooksOk()
4131: togglePixKeyFields()
4137: updatePixKeyPlaceholder()
4143: copyPixKey()
4150: copyPixCode()
4162: receiptBadge()
4172: receiptMasterBox()
4199: receiptAction()
4206: confirmReceipt()
4235: rejectReceipt()
4247: recheckReceipt()
4256: uploadReceipt()
4279: switchMasterTab()
4298: maskPhone()
4307: waLink()
4312: allVeh()
4313: allDrv()
4314: chargeVehicleId()
4326: enviarPedidoParcialAsaas()
4342: pedirPixParcial()
4360: restaurarPixTotal()
4366: responderPixParcial()
4390: contrato30Info()
4420: encerrarContrato()
4437: encerrarContratoPrompt()
4450: reativarContrato()
4474: marcarCaucaoPagoArquivar()
4495: desarquivarFicha()
4513: deliveryInspectionHtml()
4552: uploadDeliveryPhotos()
4579: delDeliveryPhoto()
4597: addCauDesconto()
4622: puxarMultaCaucao()
4643: delCauDesconto()
4665: dfCauDescontosHtml()
4698: dfContratoRender()
4742: encerrarContratoConfirmFicha()
4749: renderMasterPanel()
4915: renderArchivedDrivers()
4960: handleAddVehicle()
5000: deleteVehicle()
5001: cancelDeleteVehicle()
5003: confirmDeleteVehicle()
5027: abrirEditarVeiculo()
5049: evReadStoredCrlv()
5074: evReadChosenCrlv()
5090: fecharEditarVeiculo()
5091: salvarEditarVeiculo()
5128: drvCauMostra()
5135: drvCauLer()
5143: handleAddDriver()
5221: marcarSituacao()
5231: updateDriverPaymentStatus()
5242: cobrancaAberta()
5246: proximoDiaISO()
5247: mudarDiaPagamento()
5260: tirarEncargos()
5281: aplicarDiaPagamento()
5311: deleteDriver()
5312: cancelDeleteDriver()
5314: confirmDeleteDriver()
5336: isImageFile()
5338: prepareFile()
5360: uploadFile()
5371: fileUrl()
5382: downloadName()
5386: renderFilePreview()
5406: renderPdfToCanvas()
5433: viewDoc()
5454: **DINHEIRO**
5455: parseMoney()
5462: fmtMoney()
5463: fmtDate()
5464: todayISO()
5466: **CONFIGURAÇÕES (Gemini e Google Drive)**
5468: loadConfigStatus()
5473: paintConfig()
5478: fillOwnerVehicleSelect()
5484: saveOwnerVehicle()
5506: locadorMerged()
5519: getLocadoresList()
5539: locadorForVehicle()
5548: fillLocadorSettings()
5568: cfgOnLocadorChange()
5569: upsertLocadorInList()
5599: deleteLocadorSetting()
5615: saveLocadorSettings()
5643: openSettings()
5661: fillWhatsLocadora()
5669: salvarWhatsLocadora()
5683: carregarWaApi()
5701: salvarWaApi()
5716: waApiTexto()
5729: waApiAcao()
5740: ligarWaApi()
5753: closeSettings()
5754: saveConfig()
5764: **ASAAS (Financeiro: chave por motorista ativo + Config: conta API)**
5765: renderAsaasDrivers()
5792: toggleDriverAsaas()
5824: getAtrasoCfg()
5828: fillAtrasoCfg()
5835: saveAtrasoCfg()
5852: atrasoDataBR()
5857: atrasoPrazoUtil()
5864: calcEncargosAtraso()
5883: ehLinhaEncargo()
5884: calcAtrasoMotorista()
5914: atualizarPixAtraso()
5927: loadAsaasInfo()
5941: saveAsaas()
5949: testarAsaas()
5956: copiarAsaas()
5960: testDrive()
5967: resyncDrive()
5975: **FICHA DO MOTORISTA**
5978: openDriverFile()
6010: closeDriverFile()
6012: saveDriverFile()
6079: aiFillDriver()
6118: **CONTROLE FINANCEIRO**
6119: finRange()
6136: dayBR()
6137: inRange()
6139: onFinPeriodChange()
6145: fillFinFilters()
6153: clearFinFilters()
6157: updateFinFilterCount()
6166: openFinance()
6172: switchFinTab()
6183: finCardBtn()
6191: closeFinCardDetail()
6192: closeFinance()
6194: collectRentFinData()
6245: renderFinance()
6303: openFinCardDetail()
6510: openFinExtrato()
6604: renderFinExtratoView()
6685: openFinExtratoReport()
6702: renderFinGrafico()
6722: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
6724: okEmail()
6726: openEmailCompose()
6747: closeEmailCompose()
6748: sendEmailCompose()
6763: emailRecibo()
6768: emailIA()
6776: **RELATÓRIO DO FINANCEIRO**
6778: finFiltersText()
6783: finPeriodText()
6790: buildReportHtml()
6812: openFinReport()
6822: closeFinReport()
6823: printFinReport()
6827: shareFinReport()
6837: emailFinReport()
6843: **DESPESAS DO VEÍCULO**
6845: openExpenses()
6857: closeExpenses()
6858: fillExpenseTypes()
6863: createExpenseType()
6878: aiReadExpense()
6910: renderExpenses()
6932: saveExpense()
6959: deleteExpense()
6988: inspSlotLabel()
6991: normalizeInspDbSlot()
6994: photoDamageBadge()
7003: buildVehicleInspectionReport()
7040: copyVehicleInspectionText()
7048: photoCard()
7090: inspectionHtml()
7170: hydrateImages()
7176: openInspection()
7184: closeInspection()
7188: renderInspectionModal()
7195: uploadInspection()
7252: deleteInspectionPhoto()
7272: fmtDue()
7278: nextDueLocal()
7289: openNewPix()
7319: **CAUÇÃO DO MOTORISTA**
7320: cauOf()
7321: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
7322: devOf()
7323: devCobrancas()
7325: devPrevisao()
7333: dfDevRender()
7360: dfDevIr()
7361: dfDevSalvar()
7366: dfDevAvisar()
7372: dfDevDesfazer()
7376: dfDevReceber()
7385: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
7389: cauPlano()
7397: cauParcela()
7404: cauParcelasTexto()
7408: cauNext()
7415: dfCauFill()
7425: dfCauCalc()
7453: dfCauRead()
7466: expTypeName()
7470: driverFinVehicleId()
7482: cauEntradaItem()
7496: cauPagoDespesaItem()
7511: **CAUÇÃO: quanto já foi pago**
7513: cauStatus()
7523: obsResumoHtml()
7524: cauResumoHtml()
7529: **MULTAS E OUTRAS DESPESAS**
7530: multasOf()
7532: multaPagaAuto()
7537: multasAbertas()
7538: multasPendentes()
7539: multasResumoHtml()
7547: cobOf()
7548: dfCobFill()
7554: dfCobRead()
7557: dfCobInfo()
7567: cobResumoHtml()
7571: ajustesOf()
7575: ajusteVale()
7576: isoDia()
7578: vencProxima()
7579: previsaoProxima()
7593: previsaoHtml()
7597: dfAjRender()
7603: addAjuste()
7612: delAjuste()
7617: abrirAjustes()
7618: renderProxCobrancas()
7624: savePixExtra()
7632: dfMultFill()
7640: fdPaga()
7641: dfMultRender()
7650: toggleMultas()
7657: addMulta()
7667: delMulta()
7675: multaPaga()
7684: renderDriverExtras()
7712: mondayAfter()
7720: renderDriverProfileExtras()
7786: semanaDoPix()
7792: **MEUS RECIBOS (área do motorista)**
7794: meusRecibosLista()
7798: reciboRowHtml()
7806: renderEncerradoRecibos()
7811: openMeuReciboDireto()
7815: abrirAvisoDev()
7821: fecharAvisoDev()
7822: avisoDevTexto()
7829: enviarAvisoDev()
7849: openMeusRecibos()
7856: closeMeusRecibos()
7857: reciboPdfHtml()
7868: verMeuRecibo()
7875: voltarMeusRecibos()
7876: pdfMeuRecibo()
7880: shareMeuRecibo()
7889: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
7890: editVehicleRent()
7907: nextParcel()
7913: fillNewPixValues()
7949: newPixParts()
7980: **PERÍODO E VENCIMENTO DA COBRANÇA**
7981: dataISO()
7982: dataDe()
7983: dataMais()
7984: dataBR()
7985: diasEntre()
7986: isoSP()
7987: pixPeriodo()
7994: pixDesc()
7995: pixDiasPeriodo()
8000: marcarAjustesPorVenc()
8005: pixDatasNovo()
8014: pixDatasMudou()
8025: pixAluguelProporcional()
8033: pixPeriodoInfo()
8046: pixAddLinha()
8053: pixLinhas()
8055: descSoma()
8065: calcNewPix()
8074: **RECIBO DE PAGAMENTO**
8078: receiptValue()
8079: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
8080: atrasoDados()
8084: cobrarAtraso()
8101: allocatePix()
8120: reciboData()
8143: fmtDateTimeBR()
8144: reciboTexto()
8195: openRecibo()
8212: closeRecibo()
8213: **CORRIGIR RECIBO**
8215: corrigirLinhaHtml()
8225: openCorrigirRecibo()
8248: closeCorrigirRecibo()
8249: corrigirLer()
8255: corrigirSoma()
8262: salvarCorrigirRecibo()
8279: copyRecibo()
8284: reciboCanvas()
8301: reciboPdfBlob()
8319: shareReciboPdf()
8335: rotularTabelas()
8353: areaAberta()
8354: markAreas()
8364: closeAreas()
8368: toggleArea()
8376: dobraSalva()
8377: setDobra()
8382: toggleDobra()
8389: dobraTopo()
8396: renderMasterResumo()
8410: renderMasterTopo()
8432: loadIA()
8454: updateIABadge()
8459: loadIASetting()
8465: paintIASwitch()
8471: toggleIA()
8478: loadRobo()
8487: iaPrepararQr()
8492: paintRobo()
8521: pedirCodigoRobo()
8530: toggleRobo()
8545: iaTodosGerar()
8563: iaTodosCancelar()
8567: iaTodosConfirmar()
8581: loadIARules()
8586: iaAbrirPdf()
8592: renderIARules()
8596: saveIARules()
8601: addIARule()
8606: delIARule()
8610: openIA()
8625: closeIA()
8626: iaShow()
8627: iaPhone()
8632: renderIA()
8674: iaAprovar()
8683: iaPhone2()
8684: iaSend()
8715: iaMark()
8726: iaDelete()
8737: openPixArea()
8746: closePixArea()
8747: renderPixArea()
8792: openEditPix()
8821: deletePix()
8833: closeNewPix()
8835: saveNewPix()
8926: pushSupported()
8927: isIOS()
8928: isStandalone()
8929: b64ToBytes()
8935: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
8940: notifStatus()
8948: stepsList()
8952: notifHelpHtml()
8986: renderNotifModal()
8998: checkDriverNotifications()
9031: activateFromModal()
9044: refreshNotifButton()
9063: subscribePush()
9078: enableNotifications()
9098: closeDocViewer()
9106: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
9118: allFeaturesOn()
9119: feat()
9120: loadDriverFeatures()
9127: saveDriverFeatures()
9132: drawFeatureToggles()
9147: setAllFeatures()
9158: applyDriverFeatures()
9173: **PIX: conferência do código e QR code desenhado no aparelho**
9174: crc16()
9182: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
9184: pixTxt()
9185: pixCampo()
9186: pixGerarCodigo()
9196: pixAutoLigado()
9197: pixAutoMudou()
9202: gerarPixAuto()
9218: pixRecebedorCarregar()
9229: pixRecebedorGuardar()
9236: pixValid()
9242: renderPixQr()
9252: previewNewPixQr()
9262: **FOTO DO MOTORISTA (recortada da CNH)**
9263: photoPath()
9264: fileToCanvas()
9283: cropPhoto()
9297: savePhoto()
9302: photoBoxFrom()
9308: fillAvatar()
9319: fillAvatars()
9332: storedFile()
9339: photoFromCnh()
9351: **FOTO DO PERFIL ACOMPANHA A CNH**
9354: cnhStamp()
9355: photoFiles()
9363: avatarPath()
9368: syncCnhPhotos()
9392: pickImage()
9395: changeDriverPhoto()
9411: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
9413: uploadTmp()
9420: clearTmp()
9425: aiReadFiles()
9431: okDateISO()
9433: noAccents()
9435: makeUsername()
9444: titleCase()
9445: syncNewDriverAccess()
9451: setNewDriverPhoto()
9456: pickNewDriverPhoto()
9460: resetNewDriverForm()
9468: newDriverDocChosen()
9502: anoCrlv()
9506: formatVehicleBrand()
9511: inferVehicleBrand()
9520: normalizeCrlvFields()
9539: applyCrlvFields()
9552: aiReadCrlv()
9566: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
9567: sendWelcomeEmail()
9573: showCredentials()
9584: demoAssistente()
9603: **PERGUNTAR À IA (ÁREA IA, só o master)**
9607: iaChatReset()
9608: iaNorm()
9609: iaAcha()
9615: iaVeicTxt()
9616: iaCamposVeic()
9617: iaDataOk()
9618: iaOpcoes()
9619: iaTodosMotoristas()
9623: iaFerramenta()
9718: renderIAChat()
9735: iaChatDica()
9736: iaChatEnviar()
9771: iaChatNota()
9772: iaCancelarCartao()
9773: iaConfirmarCartao()
9818: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
9819: syncAppFinState()
9828: renderAppEarnings()
9908: saveAppEarning()
9935: workDayISO()
9936: paintDayOff()
9945: renderDayOff()
9952: setDayOff()
9962: aiReadEarning()
9995: **DESPESAS DO APLICATIVO**
9997: appExpCustomTypes()
9998: fillAppExpTypes()
10005: onAppExpTypeChange()
10010: saveAppExpense()
10035: deleteAppExpense()
10044: deleteAppEarning()
10141: loadTermsAcceptances()
10153: termsOf()
10154: currentAcceptance()
10155: needsTermsAcceptance()
10158: fmtDateTime()
10161: termsPlainText()
10165: termsHash()
10173: openTermsGate()
10196: termsGateCheck()
10204: acceptTerms()
10224: acceptanceHtml()
10235: openTermsViewer()
10253: closeTerms()
10259: downloadTermsCopy()
10280: termsBadgeMaster()
10287: termsMasterDetail()
10328: renderTermsSetupBanner()
10341: copyTermsSql()
10351: cnhExpired()
10352: cnhWaiting()
10353: onlyDigits()
10354: normName()
10356: verifyCnh()
10368: renderCnhBanner()
10386: sendNewCnh()
10434: cnhBadgeMaster()
10442: applyPendingCnh()
10450: autoReadNewCnhs()
10468: cnhPendingHtml()
10482: recheckPendingCnh()
10492: rejectPendingCnh()
10502: showContractDoc()
10620: inspectPdfSignaturesBytes()
10639: readPdfFileAsBase64AndInspect()
10654: govBrSignersList()
10666: renderGovBrFlowBox()
10718: driverGovBrBlockHtml()
10747: govBrPublicAppBaseUrl()
10751: createGovBrInvite()
10783: submitMasterGovBrPdf()
10804: submitDriverGovBrPdf()
10823: loadGovBrInvitePage()
10894: submitGovBrInvitePdf()
10913: exitGovBrInviteToLogin()
10932: contractPeriodLabel()
10933: contractStatusBadge()
10937: pdfSafeText()
10949: contractPdfFileName()
10958: cwBuildDepositChargeText()
11000: cwBuildDepositClauseText()
11012: lcClauseStart()
11019: buildDefaultClauses()
11090: generateContractPdfBytes()
11109: drawHeader()
11114: newPage()
11121: ensureSpace()
11124: wrapLines()
11148: drawJustifiedLine()
11414: renderContractsTab()
11468: renderDriverRentalContractsBox()
11527: openContractForDriver()
11534: *WIZARD DE CRIAÇÃO / EDIÇÃO DE RASCUNHO / RENOVAÇÃO*
11536: closeContractWizard()
11537: cwPopulateSelects()
11545: cwPopulateLocadores()
11557: cwOnLocadorChange()
11566: defaultWitness1ForLocador()
11574: cwApplyDefaultWitness1()
11587: cwFillLocador()
11596: cwFillDepositFromDriver()
11624: cwFillDepositFromComercial()
11646: cwSyncClauseIdx()
11655: cwSyncDepositClauseOnly()
11656: cwUpdateTrialPreview()
11672: cwDepCalc()
11717: cwApplyDriverContractDefaults()
11734: cwFillDriver()
11753: cwUpdateCrlvBar()
11762: cwNeedsCrlvFill()
11766: cwRefreshMissingBoxIfVisible()
11775: cwReadVehicleCrlv()
11824: cwReadCurrentVehicleCrlv()
11830: cwFillVehicle()
11852: cwOnDriverChange()
11868: cwOnVehicleChange()
11881: cwDefaultChecklist()
11886: cwToggleVistoriaFields()
11891: cwRenderInspChecklist()
11910: cwRenderInspDamagesSummary()
11924: cwRenderInspPhotos()
11961: cwUpdateInspPhotoDamage()
11969: cwSyncVistoriaFromVehicle()
11986: cwImportSavedPhotos()
12002: cwUploadInspPhotos()
12042: cwAnalyzeInspWithAI()
12051: cwReadSnapshot()
12110: cwRenderClausesEditor()
12120: cwRebuildClauses()
12128: cwRenderPreview()
12183: cwTogglePreview()
12188: validateContractForEmission()
12205: openContractWizard()
12340: cwSyncSources()
12395: logContractHistory()
12404: persistContract()
12495: saveContractDraft()
12496: emitContract()
12498: ensureContractPdfBlob()
12509: downloadContractPdf()
12521: printContractPdf()
12534: *MODAL DETALHE, ASSINATURAS, UPLOAD ASSINADO, RENOVAR, ENCERRAR, CANCELAR*
12535: closeContractDetail()
12536: openContractDetail()
12609: saveContractSignatures()
12636: uploadSignedContractFile()
12658: terminateContractPrompt()
12673: clearDriverPathsIfMatching()
12683: cancelContractPrompt()
12699: deleteContractPrompt()
12753: inspectionTypeBadge()
12757: inspectionStatusBadge()
12761: inspectionPdfFileName()
12768: switchContractsSubtab()
12781: renderInspectionsTab()
12841: *ANALISADOR DE IA EM LOTE + CONFIRMAÇÃO PRESENCIAL DE DANOS*
12842: runInspectionBatchAI()
12865: promptInspectionDamageConfirmation()
12943: processInspectionPhotosWithAI()
12999: analyzeSavedInspectionPhotos()
13015: renameInspectionPhoto()
13031: *WIZARD DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO)*
13034: closeInspectionWizard()
13035: openInspectionWizard()
13099: iwCollectSavedPhotosFor()
13132: iwPopulateContractsAndBase()
13155: iwSyncHeaderAndLegal()
13167: iwOnTypeChange()
13173: iwOnVehicleChange()
13191: iwOnDriverChange()
13196: iwOnContractChange()
13203: iwImportSavedPhotos()
13214: iwUploadPhotos()
13267: iwResolveEntregaBaseline()
13288: iwRunAIOnList()
13314: iwAnalyzeWithAI()
13321: iwRenderPhotos()
13360: iwUpdatePhotoField()
13365: iwUpdatePhotoDamage()
13373: iwRemovePhoto()
13379: iwRenderDamagesSummary()
13394: iwRenderComparison()
13413: iwRenderChecklist()
13432: persistInspectionTerm()
13535: saveInspectionDraft()
13536: emitInspectionTerm()
13538: *GERADOR DE PDF A4 DE VISTORIA E DEVOLUÇÃO (com grid real de fotos)*
13539: blobToEmbeddableJpeg()
13569: embedBlobIntoPdf()
13582: generateInspectionPdfBytes()
13782: ensureInspectionPdfBlob()
13792: downloadInspectionPdf()
13804: printInspectionPdf()
13817: *MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA*
13818: closeInspectionDetail()
13819: openInspectionDetail()
13879: saveInspectionSignatures()
13905: uploadSignedInspectionFile()
13927: cancelInspectionPrompt()

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

## supabase/functions/ar-aviso/index.ts (84 linhas)

11: json()
12: secret()
14: mandar()
32: ceuMetar()

## supabase/functions/ar-caes/index.ts (84 linhas)

11: json()
12: secret()
15: limpar()
17: configurar()
23: enviar()

## supabase/functions/ar-siri/index.ts (28 linhas)

6: texto()

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

## supabase/functions/motora-push/index.ts (444 linhas)

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
112: baseMessage()
116: textoNovoPix()
123: regrasDono()
128: lerMensagem()
137: iaEscreve()
154: iaReescreveTodos()
168: motoristasDoAviso()
174: reciboDados()
199: gerarPdfRecibo()
203: limpa()
223: queueWhatsApp()
248: norm()
271: **fim da Área IA**
277: textoBoasVindas()
301: sendToDriver()
314: type "public_key"
323: type "sunday"
331: type "recibo_teste"
335: type "master_alert"
339: type "driver_alert"
351: type "test"
359: type "aprovar_msg"
370: type "todos_rascunho"
378: type "todos_enviar"
388: type "new_pix"
400: type "boas_vindas"
415: type "cobranca"

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

## supabase/functions/motora-whatsapp/index.ts (324 linhas)

22: serviceKey()
29: json()
36: brl()
38: *modelos de mensagem (a Meta aprova uma vez; depois o app só preenche os {{n}})*
65: *configuração*
66: secret()
70: config()
76: graph()
85: avisarDono()
94: *montar a mensagem de cada linha da fila*
95: plano()
96: numeroWa()
101: ehPix()
102: vencTexto()
111: codigoPix()
116: linkArquivo()
120: param()
122: montar()
146: mandarModelo()
154: *fila*
155: enviarFila()
194: *criar os modelos na Meta*
195: enviarArquivoExemplo()
206: exemploQr()
210: exemploPdf()
218: criarModelos()
239: situacao()
256: teste()
265: *aviso da Meta (webhook)*
266: assinaturaOk()
275: avisoMeta()
285: ehMaster()
313: acao "enviar_fila"
314: acao "modelos"
315: acao "situacao"
316: acao "teste"

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
- supabase/2026-11-14-ar-acorda.sql: Nossa casinha (14/11/2026, placa versão 9): comando na hora. Cada comando novo em ar.cmd manda um "cutucão" pelo
- supabase/2026-11-14-ar-aviso.sql: Nossa casinha: notificação ao dono quando o ar liga ou desliga sem ele ter pedido (14/11/2026).
- supabase/2026-11-14-ar-evento.sql: Nossa casinha (14/11/2026): o bloco do ar mostra quem ligou/desligou e a que horas ("Desligado pelo automático às 18:20").
- supabase/2026-11-14-ar-historico.sql: Nossa casinha (14/11/2026): histórico para "Uso do ar" (horas ligado por dia), "24 h" (temperatura a cada 5 min com o
- supabase/2026-11-14-ar-push.sql: Nossa casinha: avisos no celular pelo próprio app (14/11/2026). Antes os avisos do ar iam como "master_alert" do
- supabase/2026-11-14-ar-siri.sql: Siri do "Nossa casinha": atalho do iPhone manda a frase para a função ar-siri, que usa uma chave só do dono.
- supabase/2026-11-14-ar-temp-dia.sql: Nossa casinha: máxima e mínima do quarto por dia (14/11/2026), para o gráfico "Temperatura máxima · últimos 7 dias".
- supabase/2026-11-15-ar-caes.sql: Nossa casinha: avisos de fome e sede dos cachorros Elvis, Belinha e Maya (15/11/2026).
- supabase/2026-11-15-ar-fora-real.sql: Nossa casinha: temperatura de lá fora MEDIDA, não prevista (15/11/2026, pedido do dono).
- supabase/2026-11-15-ar-janela.sql: Nossa casinha: lá fora mais frio = abrir a janela (15/11/2026, pedido do dono; placa versão 20).
- supabase/2026-11-23-ar-claudinho.sql: Nossa casinha (23/11/2026): comandos diretos (texto e áudio) do app para o Claudinho (J7) pela nuvem.
- supabase/2026-11-25-atraso-madrugada.sql: PIX DE ATRASO LOGO DEPOIS DA MEIA-NOITE (25/11/2026; já aplicado no Supabase)
- supabase/2026-11-25-aviso-devolucao.sql: AVISO DE DEVOLUÇÃO PELO MOTORISTA (25/11/2026, pedido do dono). Já aplicado no Supabase.
- supabase/2026-11-25-mudar-dia-pagamento.sql: MUDAR DIA DO PAGAMENTO e levar junto a cobrança em aberto (25/11/2026, pedido do dono; caso da Argelia)
- supabase/2026-11-25-tirar-encargos.sql: TIRAR MULTA E JUROS PELO APP (25/11/2026, pedido do dono; antes foi feito à mão para o Soyer). Já aplicado no Supabase.
- supabase/2026-11-25-whatsapp-api.sql: WHATSAPP OFICIAL (API da Meta) NO LUGAR DO ROBÔ (25/11/2026, pedido do dono). Já aplicado no Supabase.
- supabase/2026-11-25-whatsapp-locadora.sql: WHATSAPP DA LOCADORA (25/11/2026, pedido do dono). Já aplicado no Supabase.
