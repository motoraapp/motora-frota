# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 25/11/2026, 11:36:08. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (13776 linhas)

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
1004: <!-- MODAL TEMAS -->
1005: #modalThemes
1016: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
1017: #modalCreds
1032: <!-- JANELA DE CONFIRMAÇÃO DO APP (substitui confirm/prompt do navegador; ver uiDialogo) -->
1047: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
1048: #modalDriverFile
1090: <!-- CONTRATO DE LOCAÇÃO (rental_contracts + ações) -->
1094: <!-- ENCERRAMENTO DE CONTRATO (profiles.pix_extra.contrato_encerrado) -->
1123: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
1138: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
1180: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
1181: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
1182: #modalRecibo
1201: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
1202: #modalPixArea
1218: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
1219: #modalIA
1301: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1302: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1303: #modalEditVeh
1340: #modalSenha
1363: #modalAvisoDev
1389: #modalMeusRecibos
1407: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1408: #modalEmail
1428: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1429: #modalReport
1444: #modalFinCardDetail
1457: #modalFinance
1490: <!-- FILTROS -->
1540: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1560: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1561: #modalExpenses
1596: <!-- MODAL NOVO PIX -->
1597: #modalNewPix
1649: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1707: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1708: #modalCorrigirRecibo
1722: <!-- MODAL WIZARD DE CONTRATO DE LOCAÇÃO -->
1723: #modalContractWizard
1739: <!-- Seleção Motorista & Veículo -->
1751: <!-- Locador -->
1772: <!-- Locatário -->
1793: <!-- Veículo -->
1816: <!-- Configuração Comercial -->
1892: <!-- Anexo I: Termo de Vistoria e Entrega Integrado -->
1960: <!-- Cláusulas editáveis -->
1972: <!-- Prévia -->
1986: <!-- MODAL DETALHE, ASSINATURAS E HISTÓRICO DO CONTRATO -->
1987: #modalContractDetail
2000: <!-- MODAL GERADOR DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO) -->
2001: #modalInspectionTerm
2062: <!-- Fotos da vistoria (lote + reuso + análise IA + confirmação obrigatória de avarias) -->
2085: <!-- Resumo de Avarias Confirmadas + Checklist Bilateral + Ressalvas -->
2125: <!-- MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA -->
2126: #modalInspectionTermDetail
2139: <!-- MODAL CONFIRMAÇÃO DE DANO DETECTADO PELA IA (OBRIGATÓRIO ANTES DE NOMEAR) -->
2140: #modalInspDamageConfirm
2155: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
2156: #modalDocViewer
2164: #modalDocBody
2165: <!-- Conteúdo pré-visualizado -->
2171: #modalTerms
2185: <!-- NOTIFICAÇÕES TOAST -->
2202: lsGet()
2203: lsSet()
2204: lsDel()
2227: demoLoginRole()
2231: demoId()
2232: demoSave()
2233: demoSaved()
2235: *datas no horário de Brasília*
2236: demoLocal()
2237: demoParts()
2238: demoDay()
2239: demoNextDue()
2244: *dados fictícios (4 meses)*
2245: demoBuild()
2478: *documentos fictícios (imagem gerada na hora)*
2479: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
2480: demoDocBlob()
2558: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
2559: demoQuery()
2582: out()
2588: run()
2629: demoOnUpdate()
2639: demoOnInsert()
2771: demoClient()
2974: demoStart()
2982: demoStop()
2988: abrirDemo()
2995: trocarDemo()
3000: demoBanner()
3015: toEmail()
3019: showLogin()
3023: esc()
3028: toBRTInput()
3041: parseBRTInputToIso()
3050: dataHoraBR()
3064: uiDialogo()
3112: uiConfirm()
3121: uiPrompt()
3127: friendlyError()
3137: unwrapInvokeResult()
3157: devicePrefs()
3160: saveDevicePrefs()
3163: docRef()
3164: viewDocIdx()
3166: setBusy()
3209: **TEMAS**
3218: currentTheme()
3223: applyTheme()
3224: openThemes()
3234: pickTheme()
3240: toggleDarkMode()
3242: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
3244: loadDesignCfg()
3251: applyDesign()
3268: markMasterNav()
3275: fillDesignCfg()
3280: saveDesign()
3294: showToast()
3303: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
3304: senhaErro()
3305: abrirSenha()
3314: salvarIaCodigo()
3324: fecharSenha()
3325: salvarSenha()
3346: loginUserInput()
3351: loginErro()
3355: verSenha()
3360: handleLogin()
3409: logout()
3428: saveFirstLoginPreferences()
3451: carregarDados()
3483: aplicarDados()
3524: loadAndRender()
3551: autoRefresh()
3590: markUpdated()
3595: reload()
3600: renderApp()
3648: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
3651: masterBack()
3653: viewAsDriver()
3675: exitViewAs()
3694: viewOnly()
3695: renderViewAsBanner()
3705: showSection()
3710: withBtn()
3718: toggleDriverStatus()
3727: isOnline()
3729: updateStatusToggleUI()
3742: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
3751: checkApkUpdate()
3766: updateInstallApkButton()
3786: renderDriverPanel()
4045: switchDriverTab()
4060: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
4063: parsePixKey()
4067: normalizePixKey()
4075: pixKeyLooksOk()
4083: togglePixKeyFields()
4089: updatePixKeyPlaceholder()
4095: copyPixKey()
4102: copyPixCode()
4114: receiptBadge()
4124: receiptMasterBox()
4151: receiptAction()
4158: confirmReceipt()
4187: rejectReceipt()
4199: recheckReceipt()
4208: uploadReceipt()
4231: switchMasterTab()
4250: maskPhone()
4259: waLink()
4264: allVeh()
4265: allDrv()
4266: chargeVehicleId()
4278: enviarPedidoParcialAsaas()
4294: pedirPixParcial()
4312: restaurarPixTotal()
4318: responderPixParcial()
4342: contrato30Info()
4372: encerrarContrato()
4389: encerrarContratoPrompt()
4402: reativarContrato()
4426: marcarCaucaoPagoArquivar()
4447: desarquivarFicha()
4465: deliveryInspectionHtml()
4504: uploadDeliveryPhotos()
4531: delDeliveryPhoto()
4549: addCauDesconto()
4574: puxarMultaCaucao()
4595: delCauDesconto()
4617: dfCauDescontosHtml()
4650: dfContratoRender()
4694: encerrarContratoConfirmFicha()
4701: renderMasterPanel()
4866: renderArchivedDrivers()
4911: handleAddVehicle()
4951: deleteVehicle()
4952: cancelDeleteVehicle()
4954: confirmDeleteVehicle()
4978: abrirEditarVeiculo()
5000: evReadStoredCrlv()
5025: evReadChosenCrlv()
5041: fecharEditarVeiculo()
5042: salvarEditarVeiculo()
5079: drvCauMostra()
5086: drvCauLer()
5094: handleAddDriver()
5172: marcarSituacao()
5182: updateDriverPaymentStatus()
5193: cobrancaAberta()
5197: proximoDiaISO()
5198: mudarDiaPagamento()
5209: aplicarDiaPagamento()
5239: deleteDriver()
5240: cancelDeleteDriver()
5242: confirmDeleteDriver()
5264: isImageFile()
5266: prepareFile()
5288: uploadFile()
5299: fileUrl()
5310: downloadName()
5314: renderFilePreview()
5334: renderPdfToCanvas()
5361: viewDoc()
5382: **DINHEIRO**
5383: parseMoney()
5390: fmtMoney()
5391: fmtDate()
5392: todayISO()
5394: **CONFIGURAÇÕES (Gemini e Google Drive)**
5396: loadConfigStatus()
5401: paintConfig()
5406: fillOwnerVehicleSelect()
5412: saveOwnerVehicle()
5434: locadorMerged()
5447: getLocadoresList()
5467: locadorForVehicle()
5476: fillLocadorSettings()
5496: cfgOnLocadorChange()
5497: upsertLocadorInList()
5527: deleteLocadorSetting()
5543: saveLocadorSettings()
5571: openSettings()
5586: closeSettings()
5587: saveConfig()
5597: **ASAAS (Financeiro: chave por motorista ativo + Config: conta API)**
5598: renderAsaasDrivers()
5625: toggleDriverAsaas()
5657: getAtrasoCfg()
5661: fillAtrasoCfg()
5668: saveAtrasoCfg()
5685: atrasoDataBR()
5690: atrasoPrazoUtil()
5697: calcEncargosAtraso()
5716: ehLinhaEncargo()
5717: calcAtrasoMotorista()
5747: atualizarPixAtraso()
5760: loadAsaasInfo()
5774: saveAsaas()
5782: testarAsaas()
5789: copiarAsaas()
5793: testDrive()
5800: resyncDrive()
5808: **FICHA DO MOTORISTA**
5811: openDriverFile()
5843: closeDriverFile()
5845: saveDriverFile()
5912: aiFillDriver()
5951: **CONTROLE FINANCEIRO**
5952: finRange()
5969: dayBR()
5970: inRange()
5972: onFinPeriodChange()
5978: fillFinFilters()
5986: clearFinFilters()
5990: updateFinFilterCount()
5999: openFinance()
6005: switchFinTab()
6016: finCardBtn()
6024: closeFinCardDetail()
6025: closeFinance()
6027: collectRentFinData()
6078: renderFinance()
6136: openFinCardDetail()
6343: openFinExtrato()
6437: renderFinExtratoView()
6518: openFinExtratoReport()
6535: renderFinGrafico()
6555: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
6557: okEmail()
6559: openEmailCompose()
6580: closeEmailCompose()
6581: sendEmailCompose()
6596: emailRecibo()
6601: emailIA()
6609: **RELATÓRIO DO FINANCEIRO**
6611: finFiltersText()
6616: finPeriodText()
6623: buildReportHtml()
6645: openFinReport()
6655: closeFinReport()
6656: printFinReport()
6660: shareFinReport()
6670: emailFinReport()
6676: **DESPESAS DO VEÍCULO**
6678: openExpenses()
6690: closeExpenses()
6691: fillExpenseTypes()
6696: createExpenseType()
6711: aiReadExpense()
6743: renderExpenses()
6765: saveExpense()
6792: deleteExpense()
6821: inspSlotLabel()
6824: normalizeInspDbSlot()
6827: photoDamageBadge()
6836: buildVehicleInspectionReport()
6873: copyVehicleInspectionText()
6881: photoCard()
6923: inspectionHtml()
7003: hydrateImages()
7009: openInspection()
7017: closeInspection()
7021: renderInspectionModal()
7028: uploadInspection()
7085: deleteInspectionPhoto()
7105: fmtDue()
7111: nextDueLocal()
7122: openNewPix()
7152: **CAUÇÃO DO MOTORISTA**
7153: cauOf()
7154: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
7155: devOf()
7156: devCobrancas()
7158: devPrevisao()
7166: dfDevRender()
7193: dfDevIr()
7194: dfDevSalvar()
7199: dfDevAvisar()
7205: dfDevDesfazer()
7209: dfDevReceber()
7218: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
7222: cauPlano()
7230: cauParcela()
7237: cauParcelasTexto()
7241: cauNext()
7248: dfCauFill()
7258: dfCauCalc()
7286: dfCauRead()
7299: expTypeName()
7303: driverFinVehicleId()
7315: cauEntradaItem()
7329: cauPagoDespesaItem()
7344: **CAUÇÃO: quanto já foi pago**
7346: cauStatus()
7356: obsResumoHtml()
7357: cauResumoHtml()
7362: **MULTAS E OUTRAS DESPESAS**
7363: multasOf()
7365: multaPagaAuto()
7370: multasAbertas()
7371: multasPendentes()
7372: multasResumoHtml()
7380: cobOf()
7381: dfCobFill()
7387: dfCobRead()
7390: dfCobInfo()
7400: cobResumoHtml()
7404: ajustesOf()
7408: ajusteVale()
7409: isoDia()
7411: vencProxima()
7412: previsaoProxima()
7426: previsaoHtml()
7430: dfAjRender()
7436: addAjuste()
7445: delAjuste()
7450: abrirAjustes()
7451: renderProxCobrancas()
7457: savePixExtra()
7465: dfMultFill()
7473: fdPaga()
7474: dfMultRender()
7483: toggleMultas()
7490: addMulta()
7500: delMulta()
7508: multaPaga()
7517: renderDriverExtras()
7545: mondayAfter()
7553: renderDriverProfileExtras()
7619: semanaDoPix()
7625: **MEUS RECIBOS (área do motorista)**
7627: meusRecibosLista()
7631: reciboRowHtml()
7639: renderEncerradoRecibos()
7644: openMeuReciboDireto()
7648: abrirAvisoDev()
7654: fecharAvisoDev()
7655: avisoDevTexto()
7662: enviarAvisoDev()
7682: openMeusRecibos()
7689: closeMeusRecibos()
7690: reciboPdfHtml()
7701: verMeuRecibo()
7708: voltarMeusRecibos()
7709: pdfMeuRecibo()
7713: shareMeuRecibo()
7722: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
7723: editVehicleRent()
7740: nextParcel()
7746: fillNewPixValues()
7782: newPixParts()
7813: **PERÍODO E VENCIMENTO DA COBRANÇA**
7814: dataISO()
7815: dataDe()
7816: dataMais()
7817: dataBR()
7818: diasEntre()
7819: isoSP()
7820: pixPeriodo()
7827: pixDesc()
7828: pixDiasPeriodo()
7833: marcarAjustesPorVenc()
7838: pixDatasNovo()
7847: pixDatasMudou()
7858: pixAluguelProporcional()
7866: pixPeriodoInfo()
7879: pixAddLinha()
7886: pixLinhas()
7888: descSoma()
7898: calcNewPix()
7907: **RECIBO DE PAGAMENTO**
7911: receiptValue()
7912: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
7913: atrasoDados()
7917: cobrarAtraso()
7934: allocatePix()
7953: reciboData()
7976: fmtDateTimeBR()
7977: reciboTexto()
8028: openRecibo()
8045: closeRecibo()
8046: **CORRIGIR RECIBO**
8048: corrigirLinhaHtml()
8058: openCorrigirRecibo()
8081: closeCorrigirRecibo()
8082: corrigirLer()
8088: corrigirSoma()
8095: salvarCorrigirRecibo()
8112: copyRecibo()
8117: reciboCanvas()
8134: reciboPdfBlob()
8152: shareReciboPdf()
8168: rotularTabelas()
8186: areaAberta()
8187: markAreas()
8197: closeAreas()
8201: toggleArea()
8209: dobraSalva()
8210: setDobra()
8215: toggleDobra()
8222: dobraTopo()
8229: renderMasterResumo()
8243: renderMasterTopo()
8265: loadIA()
8287: updateIABadge()
8292: loadIASetting()
8298: paintIASwitch()
8304: toggleIA()
8311: loadRobo()
8320: iaPrepararQr()
8325: paintRobo()
8354: pedirCodigoRobo()
8363: toggleRobo()
8378: iaTodosGerar()
8396: iaTodosCancelar()
8400: iaTodosConfirmar()
8414: loadIARules()
8419: iaAbrirPdf()
8425: renderIARules()
8429: saveIARules()
8434: addIARule()
8439: delIARule()
8443: openIA()
8458: closeIA()
8459: iaShow()
8460: iaPhone()
8465: renderIA()
8507: iaAprovar()
8516: iaPhone2()
8517: iaSend()
8548: iaMark()
8559: iaDelete()
8570: openPixArea()
8579: closePixArea()
8580: renderPixArea()
8624: openEditPix()
8653: deletePix()
8665: closeNewPix()
8667: saveNewPix()
8758: pushSupported()
8759: isIOS()
8760: isStandalone()
8761: b64ToBytes()
8767: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
8772: notifStatus()
8780: stepsList()
8784: notifHelpHtml()
8818: renderNotifModal()
8830: checkDriverNotifications()
8863: activateFromModal()
8876: refreshNotifButton()
8895: subscribePush()
8910: enableNotifications()
8930: closeDocViewer()
8938: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
8950: allFeaturesOn()
8951: feat()
8952: loadDriverFeatures()
8959: saveDriverFeatures()
8964: drawFeatureToggles()
8979: setAllFeatures()
8990: applyDriverFeatures()
9005: **PIX: conferência do código e QR code desenhado no aparelho**
9006: crc16()
9014: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
9016: pixTxt()
9017: pixCampo()
9018: pixGerarCodigo()
9028: pixAutoLigado()
9029: pixAutoMudou()
9034: gerarPixAuto()
9050: pixRecebedorCarregar()
9061: pixRecebedorGuardar()
9068: pixValid()
9074: renderPixQr()
9084: previewNewPixQr()
9094: **FOTO DO MOTORISTA (recortada da CNH)**
9095: photoPath()
9096: fileToCanvas()
9115: cropPhoto()
9129: savePhoto()
9134: photoBoxFrom()
9140: fillAvatar()
9151: fillAvatars()
9164: storedFile()
9171: photoFromCnh()
9183: **FOTO DO PERFIL ACOMPANHA A CNH**
9186: cnhStamp()
9187: photoFiles()
9195: avatarPath()
9200: syncCnhPhotos()
9224: pickImage()
9227: changeDriverPhoto()
9243: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
9245: uploadTmp()
9252: clearTmp()
9257: aiReadFiles()
9263: okDateISO()
9265: noAccents()
9267: makeUsername()
9276: titleCase()
9277: syncNewDriverAccess()
9283: setNewDriverPhoto()
9288: pickNewDriverPhoto()
9292: resetNewDriverForm()
9300: newDriverDocChosen()
9334: anoCrlv()
9338: formatVehicleBrand()
9343: inferVehicleBrand()
9352: normalizeCrlvFields()
9371: applyCrlvFields()
9384: aiReadCrlv()
9398: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
9399: sendWelcomeEmail()
9405: showCredentials()
9416: demoAssistente()
9435: **PERGUNTAR À IA (ÁREA IA, só o master)**
9439: iaChatReset()
9440: iaNorm()
9441: iaAcha()
9447: iaVeicTxt()
9448: iaCamposVeic()
9449: iaDataOk()
9450: iaOpcoes()
9451: iaTodosMotoristas()
9455: iaFerramenta()
9550: renderIAChat()
9567: iaChatDica()
9568: iaChatEnviar()
9603: iaChatNota()
9604: iaCancelarCartao()
9605: iaConfirmarCartao()
9650: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
9651: syncAppFinState()
9660: renderAppEarnings()
9740: saveAppEarning()
9767: workDayISO()
9768: paintDayOff()
9777: renderDayOff()
9784: setDayOff()
9794: aiReadEarning()
9827: **DESPESAS DO APLICATIVO**
9829: appExpCustomTypes()
9830: fillAppExpTypes()
9837: onAppExpTypeChange()
9842: saveAppExpense()
9867: deleteAppExpense()
9876: deleteAppEarning()
9973: loadTermsAcceptances()
9985: termsOf()
9986: currentAcceptance()
9987: needsTermsAcceptance()
9990: fmtDateTime()
9993: termsPlainText()
9997: termsHash()
10005: openTermsGate()
10028: termsGateCheck()
10036: acceptTerms()
10056: acceptanceHtml()
10067: openTermsViewer()
10085: closeTerms()
10091: downloadTermsCopy()
10112: termsBadgeMaster()
10119: termsMasterDetail()
10160: renderTermsSetupBanner()
10173: copyTermsSql()
10183: cnhExpired()
10184: cnhWaiting()
10185: onlyDigits()
10186: normName()
10188: verifyCnh()
10200: renderCnhBanner()
10218: sendNewCnh()
10266: cnhBadgeMaster()
10274: applyPendingCnh()
10282: autoReadNewCnhs()
10300: cnhPendingHtml()
10314: recheckPendingCnh()
10324: rejectPendingCnh()
10334: showContractDoc()
10452: inspectPdfSignaturesBytes()
10471: readPdfFileAsBase64AndInspect()
10486: govBrSignersList()
10498: renderGovBrFlowBox()
10550: driverGovBrBlockHtml()
10579: govBrPublicAppBaseUrl()
10583: createGovBrInvite()
10615: submitMasterGovBrPdf()
10636: submitDriverGovBrPdf()
10655: loadGovBrInvitePage()
10726: submitGovBrInvitePdf()
10745: exitGovBrInviteToLogin()
10764: contractPeriodLabel()
10765: contractStatusBadge()
10769: pdfSafeText()
10781: contractPdfFileName()
10790: cwBuildDepositChargeText()
10832: cwBuildDepositClauseText()
10844: lcClauseStart()
10851: buildDefaultClauses()
10922: generateContractPdfBytes()
10941: drawHeader()
10946: newPage()
10953: ensureSpace()
10956: wrapLines()
10980: drawJustifiedLine()
11246: renderContractsTab()
11300: renderDriverRentalContractsBox()
11359: openContractForDriver()
11366: *WIZARD DE CRIAÇÃO / EDIÇÃO DE RASCUNHO / RENOVAÇÃO*
11368: closeContractWizard()
11369: cwPopulateSelects()
11377: cwPopulateLocadores()
11389: cwOnLocadorChange()
11398: defaultWitness1ForLocador()
11406: cwApplyDefaultWitness1()
11419: cwFillLocador()
11428: cwFillDepositFromDriver()
11456: cwFillDepositFromComercial()
11478: cwSyncClauseIdx()
11487: cwSyncDepositClauseOnly()
11488: cwUpdateTrialPreview()
11504: cwDepCalc()
11549: cwApplyDriverContractDefaults()
11566: cwFillDriver()
11585: cwUpdateCrlvBar()
11594: cwNeedsCrlvFill()
11598: cwRefreshMissingBoxIfVisible()
11607: cwReadVehicleCrlv()
11656: cwReadCurrentVehicleCrlv()
11662: cwFillVehicle()
11684: cwOnDriverChange()
11700: cwOnVehicleChange()
11713: cwDefaultChecklist()
11718: cwToggleVistoriaFields()
11723: cwRenderInspChecklist()
11742: cwRenderInspDamagesSummary()
11756: cwRenderInspPhotos()
11793: cwUpdateInspPhotoDamage()
11801: cwSyncVistoriaFromVehicle()
11818: cwImportSavedPhotos()
11834: cwUploadInspPhotos()
11874: cwAnalyzeInspWithAI()
11883: cwReadSnapshot()
11942: cwRenderClausesEditor()
11952: cwRebuildClauses()
11960: cwRenderPreview()
12015: cwTogglePreview()
12020: validateContractForEmission()
12037: openContractWizard()
12172: cwSyncSources()
12227: logContractHistory()
12236: persistContract()
12327: saveContractDraft()
12328: emitContract()
12330: ensureContractPdfBlob()
12341: downloadContractPdf()
12353: printContractPdf()
12366: *MODAL DETALHE, ASSINATURAS, UPLOAD ASSINADO, RENOVAR, ENCERRAR, CANCELAR*
12367: closeContractDetail()
12368: openContractDetail()
12441: saveContractSignatures()
12468: uploadSignedContractFile()
12490: terminateContractPrompt()
12505: clearDriverPathsIfMatching()
12515: cancelContractPrompt()
12531: deleteContractPrompt()
12585: inspectionTypeBadge()
12589: inspectionStatusBadge()
12593: inspectionPdfFileName()
12600: switchContractsSubtab()
12613: renderInspectionsTab()
12673: *ANALISADOR DE IA EM LOTE + CONFIRMAÇÃO PRESENCIAL DE DANOS*
12674: runInspectionBatchAI()
12697: promptInspectionDamageConfirmation()
12775: processInspectionPhotosWithAI()
12831: analyzeSavedInspectionPhotos()
12847: renameInspectionPhoto()
12863: *WIZARD DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO)*
12866: closeInspectionWizard()
12867: openInspectionWizard()
12931: iwCollectSavedPhotosFor()
12964: iwPopulateContractsAndBase()
12987: iwSyncHeaderAndLegal()
12999: iwOnTypeChange()
13005: iwOnVehicleChange()
13023: iwOnDriverChange()
13028: iwOnContractChange()
13035: iwImportSavedPhotos()
13046: iwUploadPhotos()
13099: iwResolveEntregaBaseline()
13120: iwRunAIOnList()
13146: iwAnalyzeWithAI()
13153: iwRenderPhotos()
13192: iwUpdatePhotoField()
13197: iwUpdatePhotoDamage()
13205: iwRemovePhoto()
13211: iwRenderDamagesSummary()
13226: iwRenderComparison()
13245: iwRenderChecklist()
13264: persistInspectionTerm()
13367: saveInspectionDraft()
13368: emitInspectionTerm()
13370: *GERADOR DE PDF A4 DE VISTORIA E DEVOLUÇÃO (com grid real de fotos)*
13371: blobToEmbeddableJpeg()
13401: embedBlobIntoPdf()
13414: generateInspectionPdfBytes()
13614: ensureInspectionPdfBlob()
13624: downloadInspectionPdf()
13636: printInspectionPdf()
13649: *MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA*
13650: closeInspectionDetail()
13651: openInspectionDetail()
13711: saveInspectionSignatures()
13737: uploadSignedInspectionFile()
13759: cancelInspectionPrompt()

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
